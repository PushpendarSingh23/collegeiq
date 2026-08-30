import { z } from "zod";

export const collegeQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(9),
  search: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  state: z.string().trim().optional().default(""),
  minFees: z.coerce.number().nonnegative().optional(),
  maxFees: z.coerce.number().positive().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  type: z.enum(["All", "Government", "Private", "Autonomous"]).optional().default("All"),
  sortBy: z
    .enum(["rating", "fees", "averagePackage", "highestPackage", "name", "establishedYear"])
    .default("rating"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CollegeQueryParams = z.infer<typeof collegeQuerySchema>;
