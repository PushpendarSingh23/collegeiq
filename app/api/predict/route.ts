import { NextRequest } from "next/server";
import { predictorInputSchema } from "@/lib/validations/predictorSchema";
import { predictColleges } from "@/lib/services/predictorService";
import { apiError, apiSuccess } from "@/lib/utils/apiResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const validationResult = predictorInputSchema.safeParse(body);

    if (!validationResult.success) {
      return apiError(
        "Invalid predictor input",
        400,
        validationResult.error.flatten().fieldErrors
      );
    }

    const predictions = await predictColleges(validationResult.data);

    return apiSuccess(predictions);
  } catch (error) {
    console.error("POST /api/predict Error:", error);
    return apiError("Internal server error while computing college predictions", 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = Object.fromEntries(searchParams.entries());

    const validationResult = predictorInputSchema.safeParse(rawParams);

    if (!validationResult.success) {
      return apiError(
        "Invalid predictor query parameters",
        400,
        validationResult.error.flatten().fieldErrors
      );
    }

    const predictions = await predictColleges(validationResult.data);

    return apiSuccess(predictions);
  } catch (error) {
    console.error("GET /api/predict Error:", error);
    return apiError("Internal server error while computing college predictions", 500);
  }
}
