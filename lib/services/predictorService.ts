import prisma from "@/lib/prisma";
import { PredictorInput } from "@/lib/validations/predictorSchema";
import { SEED_COLLEGES } from "@/prisma/seedData";

export type AdmissionProbability = "High Chance" | "Moderate Chance" | "Reach";

export interface PredictionMatch {
  collegeId: string;
  collegeName: string;
  collegeSlug: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  averagePackage: number;
  highestPackage: number;
  imageUrl: string | null;
  cutoffId: string;
  exam: string;
  branch: string | null;
  category: string;
  minRank: number;
  maxRank: number;
  userRank: number;
  probability: AdmissionProbability;
  probabilityScore: number; // 0 - 100 for visual gauge
  reasoning: string;
}

export interface PredictorResult {
  exam: string;
  userRank: number;
  category: string;
  totalMatches: number;
  summary: {
    highChanceCount: number;
    moderateChanceCount: number;
    reachCount: number;
  };
  recommendations: PredictionMatch[];
}

export async function predictColleges(input: PredictorInput): Promise<PredictorResult> {
  const { exam, rank, category = "General", preferredState, maxFees } = input;

  let rawCutoffs: Array<{
    id: string;
    exam: string;
    branch: string | null;
    category: string;
    minRank: number;
    maxRank: number;
    year: number;
    college: {
      id: string;
      name: string;
      slug: string;
      location: string;
      state: string;
      fees: number;
      rating: number;
      averagePackage: number;
      highestPackage: number;
      imageUrl: string | null;
    };
  }> = [];

  try {
    const cutoffs = await prisma.examCutoff.findMany({
      where: {
        exam: { equals: exam, mode: "insensitive" },
        ...(category && category !== "General" ? { category: { equals: category, mode: "insensitive" } } : {}),
      },
      include: {
        college: true,
      },
    });

    if (cutoffs && cutoffs.length > 0) {
      rawCutoffs = cutoffs.map((c) => ({
        id: c.id,
        exam: c.exam,
        branch: c.branch,
        category: c.category,
        minRank: c.minRank,
        maxRank: c.maxRank,
        year: c.year,
        college: {
          id: c.college.id,
          name: c.college.name,
          slug: c.college.slug,
          location: c.college.location,
          state: c.college.state,
          fees: c.college.fees,
          rating: c.college.rating,
          averagePackage: c.college.averagePackage,
          highestPackage: c.college.highestPackage,
          imageUrl: c.college.imageUrl,
        },
      }));
    }
  } catch (error) {
    console.warn(
      "⚠️ Prisma predictor lookup fell back to in-memory dataset.",
      error instanceof Error ? error.message : error
    );
  }

  // Fallback to in-memory dataset if database cutoffs are empty
  if (rawCutoffs.length === 0) {
    SEED_COLLEGES.forEach((college, cIdx) => {
      const collegeId = `seed-col-${cIdx + 1}`;
      college.cutoffs.forEach((cutoff, ctIdx) => {
        if (cutoff.exam.toLowerCase() === exam.toLowerCase()) {
          rawCutoffs.push({
            id: `${collegeId}-ct-${ctIdx + 1}`,
            exam: cutoff.exam,
            branch: cutoff.branch,
            category: cutoff.category,
            minRank: cutoff.minRank,
            maxRank: cutoff.maxRank,
            year: cutoff.year,
            college: {
              id: collegeId,
              name: college.name,
              slug: college.slug,
              location: college.location,
              state: college.state,
              fees: college.fees,
              rating: college.rating,
              averagePackage: college.averagePackage,
              highestPackage: college.highestPackage,
              imageUrl: college.imageUrl ?? null,
            },
          });
        }
      });
    });
  }

  // Process cutoffs into predictions
  const matches: PredictionMatch[] = [];

  for (const item of rawCutoffs) {
    // Optional filters
    if (preferredState && item.college.state.toLowerCase() !== preferredState.toLowerCase()) {
      continue;
    }
    if (maxFees && item.college.fees > maxFees) {
      continue;
    }

    const { minRank, maxRank } = item;

    let probability: AdmissionProbability | null = null;
    let probabilityScore = 0;
    let reasoning = "";

    // Candidate rank is better or equal to the closing cutoff
    if (rank <= maxRank) {
      probability = "High Chance";
      // Rank is inside or better than opening rank
      if (rank <= minRank) {
        probabilityScore = 95;
        reasoning = `Your rank (${rank.toLocaleString()}) comfortably surpasses the opening rank (${minRank.toLocaleString()}) of this program.`;
      } else {
        const span = maxRank - minRank || 1;
        const position = (maxRank - rank) / span;
        probabilityScore = Math.min(92, Math.max(75, Math.round(75 + position * 17)));
        reasoning = `Your rank (${rank.toLocaleString()}) is comfortably within the closing cutoff (${maxRank.toLocaleString()}).`;
      }
    } else if (rank <= Math.round(maxRank * 1.18)) {
      // Within 18% of cutoff -> Moderate chance in subsequent spot rounds
      probability = "Moderate Chance";
      probabilityScore = Math.min(74, Math.max(50, Math.round(74 - ((rank - maxRank) / (maxRank * 0.18)) * 24)));
      reasoning = `Your rank (${rank.toLocaleString()}) is close to previous closing rank (${maxRank.toLocaleString()}); feasible in spot or subsequent counseling rounds.`;
    } else if (rank <= Math.round(maxRank * 1.38)) {
      // Within 38% margin -> Reach / Ambitious
      probability = "Reach";
      probabilityScore = Math.min(49, Math.max(25, Math.round(49 - ((rank - maxRank * 1.18) / (maxRank * 0.2)) * 24)));
      reasoning = `Ambitious match: Closing rank was ${maxRank.toLocaleString()}. May require special category or institutional counseling rounds.`;
    }

    if (probability) {
      matches.push({
        collegeId: item.college.id,
        collegeName: item.college.name,
        collegeSlug: item.college.slug,
        location: item.college.location,
        state: item.college.state,
        fees: item.college.fees,
        rating: item.college.rating,
        averagePackage: item.college.averagePackage,
        highestPackage: item.college.highestPackage,
        imageUrl: item.college.imageUrl,
        cutoffId: item.id,
        exam: item.exam,
        branch: item.branch,
        category: item.category,
        minRank,
        maxRank,
        userRank: rank,
        probability,
        probabilityScore,
        reasoning,
      });
    }
  }

  // Sort recommendations:
  // 1. Probability tier order: High Chance -> Moderate Chance -> Reach
  // 2. Score descending
  // 3. College Rating descending
  // 4. Average Package descending
  const tierWeights: Record<AdmissionProbability, number> = {
    "High Chance": 3,
    "Moderate Chance": 2,
    Reach: 1,
  };

  matches.sort((a, b) => {
    const tierDiff = tierWeights[b.probability] - tierWeights[a.probability];
    if (tierDiff !== 0) return tierDiff;

    const scoreDiff = b.probabilityScore - a.probabilityScore;
    if (scoreDiff !== 0) return scoreDiff;

    const ratingDiff = b.rating - a.rating;
    if (ratingDiff !== 0) return ratingDiff;

    return b.averagePackage - a.averagePackage;
  });

  const highChanceCount = matches.filter((m) => m.probability === "High Chance").length;
  const moderateChanceCount = matches.filter((m) => m.probability === "Moderate Chance").length;
  const reachCount = matches.filter((m) => m.probability === "Reach").length;

  return {
    exam,
    userRank: rank,
    category,
    totalMatches: matches.length,
    summary: {
      highChanceCount,
      moderateChanceCount,
      reachCount,
    },
    recommendations: matches,
  };
}
