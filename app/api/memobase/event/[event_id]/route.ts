import { NextRequest } from "next/server";
import { createApiResponse, createApiError } from "@/lib/api-response";
import { createClient } from "@/utils/supabase/server";
import { memoBaseClient } from "@/utils/memobase/client";

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const event_id = context.params.event_id;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return createApiError("Unauthorized", 401);
  }

  if (!event_id) {
    return createApiError("Bad Request", 400);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(data.user.id);
    await user.deleteEvent(event_id);
    return createApiResponse(null, "Event deleted");
  } catch (error) {
    console.error(error);
    return createApiError("Delete failed", 500);
  }
}
