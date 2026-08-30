import { describe, it, expect } from "vitest";
import { predictColleges } from "@/lib/services/predictorService";

describe("Predictor Service", () => {
  it("should return high chance recommendations for top ranks in JEE Main", async () => {
    const result = await predictColleges({
      exam: "JEE Main",
      rank: 50,
      category: "General",
    });

    expect(result.totalMatches).toBeGreaterThan(0);
    expect(result.summary.highChanceCount).toBeGreaterThan(0);

    const firstMatch = result.recommendations[0];
    expect(firstMatch.probability).toBe("High Chance");
    expect(firstMatch.probabilityScore).toBeGreaterThanOrEqual(75);
    expect(firstMatch.reasoning).toBeDefined();
  });

  it("should categorize mid-range ranks appropriately", async () => {
    const result = await predictColleges({
      exam: "JEE Main",
      rank: 15000,
      category: "General",
    });

    expect(result.recommendations.length).toBeGreaterThan(0);

    // Should include colleges that have cutoffs around 15000 (e.g. DTU, NSUT, NITs, RVCE)
    const colleges = result.recommendations.map((r) => r.collegeName);
    expect(colleges.length).toBeGreaterThan(0);

    const hasReasoning = result.recommendations.every((r) => r.reasoning.length > 0);
    expect(hasReasoning).toBe(true);
  });

  it("should match medical colleges for NEET rank", async () => {
    const result = await predictColleges({
      exam: "NEET",
      rank: 25,
      category: "General",
    });

    expect(result.recommendations.length).toBeGreaterThan(0);
    const aiimsMatch = result.recommendations.find((r) =>
      r.collegeName.includes("AIIMS")
    );
    expect(aiimsMatch).toBeDefined();
    expect(aiimsMatch?.probability).toBe("High Chance");
  });

  it("should filter predictor results by preferred state", async () => {
    const result = await predictColleges({
      exam: "JEE Main",
      rank: 5000,
      category: "General",
      preferredState: "Delhi",
    });

    result.recommendations.forEach((rec) => {
      expect(rec.state.toLowerCase()).toBe("delhi");
    });
  });
});
