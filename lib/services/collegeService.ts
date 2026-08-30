import prisma from "@/lib/prisma";
import { CollegeQueryParams } from "@/lib/validations/collegeSchema";
import { SEED_COLLEGES, SeedCollege } from "@/prisma/seedData";

export interface CollegeSummary {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  city: string;
  fees: number;
  rating: number;
  overview: string;
  averagePackage: number;
  highestPackage: number;
  establishedYear: number | null;
  type: string;
  websiteUrl: string | null;
  imageUrl: string | null;
  courseCount?: number;
  reviewCount?: number;
  cutoffCount?: number;
}

/**
 * In-memory fallback filter implementation for resilient development and testing
 * when a live PostgreSQL instance is not yet connected.
 */
function queryFallbackColleges(params: CollegeQueryParams) {
  let filtered = [...SEED_COLLEGES].map((c, index) => ({
    ...c,
    id: `seed-col-${index + 1}`,
    establishedYear: c.establishedYear ?? null,
    websiteUrl: c.websiteUrl ?? null,
    imageUrl: c.imageUrl ?? null,
    courseCount: c.courses.length,
    reviewCount: c.reviews.length,
    cutoffCount: c.cutoffs.length,
  }));

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.overview.toLowerCase().includes(q)
    );
  }

  if (params.location) {
    const loc = params.location.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.location.toLowerCase().includes(loc) ||
        c.city.toLowerCase().includes(loc) ||
        c.state.toLowerCase().includes(loc)
    );
  }

  if (params.state) {
    const st = params.state.toLowerCase();
    filtered = filtered.filter((c) => c.state.toLowerCase().includes(st));
  }

  if (params.minFees !== undefined) {
    filtered = filtered.filter((c) => c.fees >= params.minFees!);
  }

  if (params.maxFees !== undefined) {
    filtered = filtered.filter((c) => c.fees <= params.maxFees!);
  }

  if (params.minRating !== undefined) {
    filtered = filtered.filter((c) => c.rating >= params.minRating!);
  }

  if (params.type && params.type !== "All") {
    filtered = filtered.filter(
      (c) => c.type.toLowerCase() === params.type.toLowerCase()
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    const key = params.sortBy as keyof typeof a;
    const aVal = a[key] ?? 0;
    const bVal = b[key] ?? 0;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return params.sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return params.sortOrder === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const total = filtered.length;
  const page = params.page;
  const limit = params.limit;
  const totalPages = Math.ceil(total / limit) || 1;
  const skip = (page - 1) * limit;
  const data = filtered.slice(skip, skip + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export async function getColleges(params: CollegeQueryParams) {
  try {
    const whereClause: Record<string, unknown> = {};

    if (params.search) {
      whereClause.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { location: { contains: params.search, mode: "insensitive" } },
        { city: { contains: params.search, mode: "insensitive" } },
        { state: { contains: params.search, mode: "insensitive" } },
        { overview: { contains: params.search, mode: "insensitive" } },
      ];
    }

    if (params.location) {
      whereClause.OR = [
        { location: { contains: params.location, mode: "insensitive" } },
        { city: { contains: params.location, mode: "insensitive" } },
      ];
    }

    if (params.state) {
      whereClause.state = { contains: params.state, mode: "insensitive" };
    }

    if (params.minFees !== undefined || params.maxFees !== undefined) {
      whereClause.fees = {};
      if (params.minFees !== undefined) {
        (whereClause.fees as Record<string, number>).gte = params.minFees;
      }
      if (params.maxFees !== undefined) {
        (whereClause.fees as Record<string, number>).lte = params.maxFees;
      }
    }

    if (params.minRating !== undefined) {
      whereClause.rating = { gte: params.minRating };
    }

    if (params.type && params.type !== "All") {
      whereClause.type = { equals: params.type, mode: "insensitive" };
    }

    const skip = (params.page - 1) * params.limit;
    const take = params.limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where: whereClause,
        orderBy: {
          [params.sortBy]: params.sortOrder,
        },
        skip,
        take,
        include: {
          _count: {
            select: {
              courses: true,
              reviews: true,
              cutoffs: true,
            },
          },
        },
      }),
      prisma.college.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / params.limit) || 1;

    const data: CollegeSummary[] = colleges.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      location: c.location,
      state: c.state,
      city: c.city,
      fees: c.fees,
      rating: c.rating,
      overview: c.overview,
      averagePackage: c.averagePackage,
      highestPackage: c.highestPackage,
      establishedYear: c.establishedYear,
      type: c.type,
      websiteUrl: c.websiteUrl,
      imageUrl: c.imageUrl,
      courseCount: c._count.courses,
      reviewCount: c._count.reviews,
      cutoffCount: c._count.cutoffs,
    }));

    return {
      data,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
        hasNextPage: params.page < totalPages,
        hasPrevPage: params.page > 1,
      },
    };
  } catch (error) {
    console.warn(
      "⚠️ PostgreSQL connection offline or uninitialized. Using in-memory dataset fallback.",
      error instanceof Error ? error.message : error
    );
    return queryFallbackColleges(params);
  }
}

export async function getCollegeById(idOrSlug: string) {
  try {
    const college = await prisma.college.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        courses: {
          orderBy: { fees: "asc" },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
        },
        cutoffs: {
          orderBy: [{ exam: "asc" }, { minRank: "asc" }],
        },
      },
    });

    if (college) {
      return college;
    }
  } catch (error) {
    console.warn(
      "⚠️ Prisma lookup failed. Checking in-memory dataset fallback.",
      error instanceof Error ? error.message : error
    );
  }

  // Fallback to in-memory seed dataset
  const match = SEED_COLLEGES.find(
    (c, idx) =>
      c.slug === idOrSlug ||
      `seed-col-${idx + 1}` === idOrSlug ||
      c.name.toLowerCase() === idOrSlug.toLowerCase()
  );

  if (!match) return null;

  const collegeId = `seed-col-${SEED_COLLEGES.indexOf(match) + 1}`;

  return {
    id: collegeId,
    name: match.name,
    slug: match.slug,
    location: match.location,
    state: match.state,
    city: match.city,
    fees: match.fees,
    rating: match.rating,
    overview: match.overview,
    averagePackage: match.averagePackage,
    highestPackage: match.highestPackage,
    establishedYear: match.establishedYear ?? null,
    type: match.type,
    websiteUrl: match.websiteUrl ?? null,
    imageUrl: match.imageUrl ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
    courses: match.courses.map((cr, idx) => ({
      id: `${collegeId}-cr-${idx + 1}`,
      name: cr.name,
      degree: cr.degree,
      duration: cr.duration,
      fees: cr.fees,
      seats: cr.seats ?? null,
      collegeId,
      createdAt: new Date(),
    })),
    reviews: match.reviews.map((rv, idx) => ({
      id: `${collegeId}-rv-${idx + 1}`,
      rating: rv.rating,
      comment: rv.comment,
      authorName: rv.authorName,
      authorRole: rv.authorRole ?? null,
      collegeId,
      createdAt: new Date(),
    })),
    cutoffs: match.cutoffs.map((ct, idx) => ({
      id: `${collegeId}-ct-${idx + 1}`,
      exam: ct.exam,
      branch: ct.branch,
      category: ct.category,
      minRank: ct.minRank,
      maxRank: ct.maxRank,
      year: ct.year,
      collegeId,
      createdAt: new Date(),
    })),
  };
}

export async function getDistinctLocations(): Promise<{ locations: string[]; states: string[] }> {
  try {
    const colleges = await prisma.college.findMany({
      select: { location: true, state: true },
      distinct: ["location"],
    });

    const locations = Array.from(new Set(colleges.map((c) => c.location))).sort();
    const states = Array.from(new Set(colleges.map((c) => c.state))).sort();

    return { locations, states };
  } catch {
    const locations = Array.from(new Set(SEED_COLLEGES.map((c) => c.location))).sort();
    const states = Array.from(new Set(SEED_COLLEGES.map((c) => c.state))).sort();
    return { locations, states };
  }
}
