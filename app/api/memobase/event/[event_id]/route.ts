import { createApiResponse, createApiError } from "@/lib/api-response";
import { createClient } from "@/utils/supabase/server";
import { memoBaseClient } from "@/utils/memobase/client";
import { NextRequest } from "next/server";

// ✅ Correct context typing using Next.js App Router
export async function DELETE(
  req: NextRequest,
  { params }: { params: { event_id: string } }
) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return createApiError("未授权", 401);
  }

  const event_id = params.event_id;
  if (!event_id) {
    return createApiError("Bad Request", 400);
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
