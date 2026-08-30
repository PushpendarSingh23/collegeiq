import { z } from "zod";

export const ALLOWED_EXAMS = [
  "JEE Main",
  "NEET",
  "CAT",
  "BITSAT",
  "GATE",
] as const;

export const predictorInputSchema = z.object({
  exam: z.enum(ALLOWED_EXAMS, {
    error: `Exam must be one of: ${ALLOWED_EXAMS.join(", ")}`,
  }),
  rank: z.coerce
    .number({
      error: "Rank is required and must be a valid positive integer",
    })
    .int("Rank must be a whole number")
    .positive("Rank must be greater than 0")
    .max(1000000, "Rank is unreasonably high (maximum 1,000,000)"),
  category: z.string().trim().default("General"),
  preferredState: z.string().trim().optional(),
  maxFees: z.coerce.number().positive().optional(),
});

export type PredictorInput = z.infer<typeof predictorInputSchema>;
