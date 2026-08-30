import { NextRequest } from "next/server";
import { compareQuerySchema } from "@/lib/validations/compareSchema";
import { getComparisonData } from "@/lib/services/compareService";
import { apiError, apiSuccess } from "@/lib/utils/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawIds = searchParams.get("ids");

    if (!rawIds) {
      return apiError(
        "Please provide 'ids' query parameter (e.g. ?ids=col-1,col-2,col-3)",
        400
      );
    }

    const validationResult = compareQuerySchema.safeParse({ ids: rawIds });

    if (!validationResult.success) {
      return apiError(
        "Invalid comparison request",
        400,
        validationResult.error.flatten().fieldErrors
      );
    }

    const comparisonData = await getComparisonData(validationResult.data.ids);

    if (comparisonData.colleges.length === 0) {
      return apiError("None of the specified colleges could be found", 404);
    }

    return apiSuccess(comparisonData);
  } catch (error) {
    console.error("GET /api/compare Error:", error);
    return apiError("Internal server error while comparing colleges", 500);
  }
}
