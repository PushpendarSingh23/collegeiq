import { z } from "zod";

export const compareQuerySchema = z.object({
  ids: z
    .string()
    .min(1, "At least one college ID is required")
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )
    .pipe(
      z
        .array(z.string().min(1))
        .min(1, "Please provide at least 1 college ID")
        .max(3, "You can compare at most 3 colleges simultaneously")
    ),
});

export type CompareQueryParams = z.infer<typeof compareQuerySchema>;
