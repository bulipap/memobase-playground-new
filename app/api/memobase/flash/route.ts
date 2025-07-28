import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";

export async function POST() {
  const staticUserId = process.env.STATIC_USER_ID;
  if (!staticUserId) {
    return createApiError("Missing STATIC_USER_ID", 500);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    await user.flush("chat", true);
    return createApiResponse(null, "成功");
  } catch (error) {
    console.error(error);
    return createApiError("失败", 500);
  }
}
