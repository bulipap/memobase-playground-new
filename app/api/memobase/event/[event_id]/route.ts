import { createApiResponse, createApiError } from "@/lib/api-response";
import { createClient } from "@/utils/supabase/server";
import { memoBaseClient } from "@/utils/memobase/client";

export async function DELETE(
  req: Request,
  context: { params: { event_id: string } }
) {
  const { event_id } = context.params;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return createApiError("未授权", 401);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(data.user.id);
    await user.deleteEvent(event_id);
    return createApiResponse(null, "删除成功");
  } catch (err) {
    console.error(err);
    return createApiError("删除失败", 500);
  }
}
