import { NextRequest } from "next/server";
import { getCollegeById } from "@/lib/services/collegeService";
import { apiError, apiSuccess } from "@/lib/utils/apiResponse";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string" || id.trim() === "") {
      return apiError("College ID or slug is required", 400);
    }

    const college = await getCollegeById(id);

    if (!college) {
      return apiError(`College with ID or slug '${id}' not found`, 404);
    }

    return apiSuccess(college);
  } catch (error) {
    console.error("GET /api/colleges/[id] Error:", error);
    return apiError("Internal server error while retrieving college details", 500);
  }
}
