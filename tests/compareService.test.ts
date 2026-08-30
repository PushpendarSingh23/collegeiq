import { describe, it, expect } from "vitest";
import { getComparisonData } from "@/lib/services/compareService";

describe("Compare Service", () => {
  it("should return side-by-side comparison for 2 colleges", async () => {
    const result = await getComparisonData(["iit-bombay", "iit-delhi"]);

    expect(result.colleges.length).toBe(2);
    expect(result.colleges[0].slug).toBe("iit-bombay");
    expect(result.colleges[1].slug).toBe("iit-delhi");
    expect(result.metrics.roiRatios).toBeDefined();
    expect(result.metrics.feeRankings).toBeDefined();
    expect(result.metrics.placementRankings).toBeDefined();
  });

  it("should cap comparison at maximum 3 colleges", async () => {
    const result = await getComparisonData([
      "iit-bombay",
      "iit-delhi",
      "iit-madras",
      "bits-pilani",
    ]);

    expect(result.colleges.length).toBe(3);
  });

  it("should filter out duplicate IDs", async () => {
    const result = await getComparisonData([
      "iit-bombay",
      "iit-bombay",
      "iit-delhi",
    ]);

    expect(result.colleges.length).toBe(2);
  });
});
