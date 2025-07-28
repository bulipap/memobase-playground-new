import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";

export async function GET() {
  try {
    // Use static user ID
    const staticUserId = process.env.STATIC_USER_ID;
    if (!staticUserId) {
      return createApiError("Missing STATIC_USER_ID", 500);
    }

    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    const event = await user.event();

    return createApiResponse(event, "获取记录成功");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "获取记录失败";
    return createApiError(errorMessage, 500);
  }
}
