import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";

/**
 * 删除 profile
 * @param profile_id profile ID
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ profile_id: string }> }
) {
  const { profile_id } = await params;
  const staticUserId = process.env.STATIC_USER_ID;
  if (!staticUserId) {
    return createApiError("Missing STATIC_USER_ID", 500);
  }
  if (!profile_id) {
    return createApiError("Bad Request", 400);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    await user.deleteProfile(profile_id);
    return createApiResponse(null, "删除成功");
  } catch (error: unknown) {
    console.error(error);
    return createApiError("删除失败", 500);
  }
}

/**
 * 更新 profile
 * @param profile_id profile ID
 * @param body profile data
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ profile_id: string }> }
) {
  const { profile_id } = await params;
  const staticUserId = process.env.STATIC_USER_ID;
  if (!staticUserId) {
    return createApiError("Missing STATIC_USER_ID", 500);
  }
  if (!profile_id) {
    return createApiError("Bad Request", 400);
  }

  const { content, topic, sub_topic } = await req.json();
  if (!content || !topic || !sub_topic) {
    return createApiError("Bad Request", 400);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    await user.updateProfile(profile_id, content, topic, sub_topic);
    return createApiResponse(null, "成功");
  } catch (error: unknown) {
    console.error(error);
    return createApiError("失败", 500);
  }
}
