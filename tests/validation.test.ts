import { describe, it, expect } from "vitest";
import { collegeQuerySchema } from "@/lib/validations/collegeSchema";
import { predictorInputSchema } from "@/lib/validations/predictorSchema";
import { compareQuerySchema } from "@/lib/validations/compareSchema";

describe("Input Validation Schemas", () => {
  describe("collegeQuerySchema", () => {
    it("should accept valid query parameters and apply defaults", () => {
      const parsed = collegeQuerySchema.parse({
        page: "2",
        limit: "15",
        search: "IIT",
        minFees: "100000",
        sortBy: "rating",
      });

      expect(parsed.page).toBe(2);
      expect(parsed.limit).toBe(15);
      expect(parsed.search).toBe("IIT");
      expect(parsed.minFees).toBe(100000);
      expect(parsed.sortBy).toBe("rating");
      expect(parsed.sortOrder).toBe("desc");
    });

    it("should reject negative page numbers", () => {
      const result = collegeQuerySchema.safeParse({ page: "-1" });
      expect(result.success).toBe(false);
    });

    it("should reject invalid sort fields", () => {
      const result = collegeQuerySchema.safeParse({ sortBy: "unknownField" });
      expect(result.success).toBe(false);
    });
  });

  describe("predictorInputSchema", () => {
    it("should accept valid JEE Main exam and rank", () => {
      const result = predictorInputSchema.safeParse({
        exam: "JEE Main",
        rank: 15000,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.exam).toBe("JEE Main");
        expect(result.data.rank).toBe(15000);
        expect(result.data.category).toBe("General");
      }
    });

    it("should reject negative or zero rank", () => {
      const resultZero = predictorInputSchema.safeParse({
        exam: "JEE Main",
        rank: 0,
      });
      const resultNegative = predictorInputSchema.safeParse({
        exam: "NEET",
        rank: -50,
      });

      expect(resultZero.success).toBe(false);
      expect(resultNegative.success).toBe(false);
    });

    it("should reject unsupported exams", () => {
      const result = predictorInputSchema.safeParse({
        exam: "SAT_INVALID",
        rank: 1200,
      });

      expect(result.success).toBe(false);
    });
  });

  describe("compareQuerySchema", () => {
    it("should parse comma separated IDs", () => {
      const result = compareQuerySchema.safeParse({
        ids: "iit-bombay, iit-delhi, bits-pilani",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.ids).toEqual(["iit-bombay", "iit-delhi", "bits-pilani"]);
      }
    });

    it("should reject more than 3 colleges", () => {
      const result = compareQuerySchema.safeParse({
        ids: "col1,col2,col3,col4",
      });

      expect(result.success).toBe(false);
    });

    it("should reject empty string", () => {
      const result = compareQuerySchema.safeParse({ ids: "" });
      expect(result.success).toBe(false);
    });
  });
});
