import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";

export async function GET() {
  try {
    const staticUserId = process.env.STATIC_USER_ID;
    if (!staticUserId) {
      return createApiError("Missing STATIC_USER_ID", 500);
    }

    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    const profiles = await user.profile();

    return createApiResponse(profiles, "获取记录成功");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "获取记录失败";
    return createApiError(errorMessage, 500);
  }
}

/**
 * 添加 profile
 * @param body profile data
 */
export async function POST(req: Request) {
  const staticUserId = process.env.STATIC_USER_ID;
  if (!staticUserId) {
    return createApiError("Missing STATIC_USER_ID", 500);
  }

  const { content, topic, sub_topic } = await req.json();
  if (!content || !topic || !sub_topic) {
    return createApiError("Bad Request", 400);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    await user.addProfile(content, topic, sub_topic);
    return createApiResponse(null, "成功");
  } catch (error: unknown) {
    console.error(error);
    return createApiError("失败", 500);
  }
}
