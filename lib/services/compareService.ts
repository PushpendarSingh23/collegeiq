import { getCollegeById } from "./collegeService";

export interface ComparisonResult {
  colleges: Array<NonNullable<Awaited<ReturnType<typeof getCollegeById>>>>;
  metrics: {
    roiRatios: Record<string, number>; // avgPackage / (fees * 4)
    feeRankings: Record<string, number>; // 1 = most affordable
    placementRankings: Record<string, number>; // 1 = highest package
    ratingRankings: Record<string, number>; // 1 = highest rating
  };
}

export async function getComparisonData(ids: string[]): Promise<ComparisonResult> {
  const uniqueIds = Array.from(new Set(ids)).slice(0, 3);

  const collegesWithNulls = await Promise.all(
    uniqueIds.map((id) => getCollegeById(id))
  );

  const colleges = collegesWithNulls.filter(
    (c): c is NonNullable<typeof c> => c !== null
  );

  // Compute comparative metric rankings
  const roiRatios: Record<string, number> = {};
  const feeRankings: Record<string, number> = {};
  const placementRankings: Record<string, number> = {};
  const ratingRankings: Record<string, number> = {};

  colleges.forEach((c) => {
    const total4YearFee = c.fees * 4 || 1;
    roiRatios[c.id] = Number((c.averagePackage / total4YearFee).toFixed(2));
  });

  // Calculate ranks
  const sortedByFee = [...colleges].sort((a, b) => a.fees - b.fees);
  sortedByFee.forEach((c, idx) => {
    feeRankings[c.id] = idx + 1;
  });

  const sortedByPlacement = [...colleges].sort(
    (a, b) => b.averagePackage - a.averagePackage
  );
  sortedByPlacement.forEach((c, idx) => {
    placementRankings[c.id] = idx + 1;
  });

  const sortedByRating = [...colleges].sort((a, b) => b.rating - a.rating);
  sortedByRating.forEach((c, idx) => {
    ratingRankings[c.id] = idx + 1;
  });

  return {
    colleges,
    metrics: {
      roiRatios,
      feeRankings,
      placementRankings,
      ratingRankings,
    },
  };
}
