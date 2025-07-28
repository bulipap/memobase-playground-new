import { createApiResponse, createApiError } from "@/lib/api-response";
import { createClient } from "@/utils/supabase/server";
import { memoBaseClient } from "@/utils/memobase/client";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string | string[]> }
) {
  const { event_id } = context.params;

  if (!event_id || Array.isArray(event_id)) {
    return createApiError("Bad Request", 400);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return createApiError("未授权", 401);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(data.user.id);
    await user.deleteEvent(event_id);
    return createApiResponse(null, "删除成功");
  } catch (error: unknown) {
    console.error(error);
    return createApiError("删除失败", 500);
  }
}
