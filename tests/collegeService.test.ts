import { describe, it, expect } from "vitest";
import { getColleges, getCollegeById, getDistinctLocations } from "@/lib/services/collegeService";
import { collegeQuerySchema } from "@/lib/validations/collegeSchema";

describe("College Service", () => {
  it("should return paginated colleges with metadata", async () => {
    const params = collegeQuerySchema.parse({
      page: 1,
      limit: 5,
    });

    const result = await getColleges(params);

    expect(result.data.length).toBeLessThanOrEqual(5);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(5);
    expect(result.pagination.total).toBeGreaterThanOrEqual(30);
    expect(result.pagination.totalPages).toBeGreaterThanOrEqual(6);
  });

  it("should filter colleges by search query", async () => {
    const params = collegeQuerySchema.parse({
      search: "Bombay",
      page: 1,
      limit: 10,
    });

    const result = await getColleges(params);

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.some((c) => c.name.includes("Bombay"))).toBe(true);
  });

  it("should filter colleges by maximum fees", async () => {
    const params = collegeQuerySchema.parse({
      maxFees: 200000,
      page: 1,
      limit: 20,
    });

    const result = await getColleges(params);

    expect(result.data.length).toBeGreaterThan(0);
    result.data.forEach((c) => {
      expect(c.fees).toBeLessThanOrEqual(200000);
    });
  });

  it("should retrieve college details by slug", async () => {
    const college = await getCollegeById("iit-delhi");

    expect(college).toBeDefined();
    expect(college?.slug).toBe("iit-delhi");
    expect(college?.courses.length).toBeGreaterThan(0);
    expect(college?.reviews.length).toBeGreaterThan(0);
    expect(college?.cutoffs.length).toBeGreaterThan(0);
  });

  it("should return null for non-existent college ID", async () => {
    const college = await getCollegeById("completely-non-existent-id-9999");
    expect(college).toBeNull();
  });

  it("should return list of distinct locations and states", async () => {
    const { locations, states } = await getDistinctLocations();
    expect(locations.length).toBeGreaterThan(0);
    expect(states.length).toBeGreaterThan(0);
    expect(states).toContain("Delhi");
    expect(states).toContain("Maharashtra");
  });
});
