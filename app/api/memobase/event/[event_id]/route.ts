import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";
import type { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { event_id: string } }
) {
  const { event_id } = params;

  if (!event_id) {
    return createApiError("Bad Request", 400);
  }

  const staticUserId = process.env.STATIC_USER_ID;
  if (!staticUserId) {
    return createApiError("Missing STATIC_USER_ID", 500);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    await user.deleteEvent(event_id);
    return createApiResponse(null, "删除成功");
  } catch (err) {
    console.error(err);
    return createApiError("删除失败", 500);
  }
}
