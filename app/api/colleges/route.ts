import { NextRequest } from "next/server";
import { collegeQuerySchema } from "@/lib/validations/collegeSchema";
import { getColleges } from "@/lib/services/collegeService";
import { apiError, apiSuccess } from "@/lib/utils/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = Object.fromEntries(searchParams.entries());

    const validationResult = collegeQuerySchema.safeParse(rawParams);

    if (!validationResult.success) {
      return apiError(
        "Invalid query parameters",
        400,
        validationResult.error.flatten().fieldErrors
      );
    }

    const { data, pagination } = await getColleges(validationResult.data);

    return apiSuccess(data, pagination);
  } catch (error) {
    console.error("GET /api/colleges Error:", error);
    return apiError("Internal server error while fetching colleges", 500);
  }
}
