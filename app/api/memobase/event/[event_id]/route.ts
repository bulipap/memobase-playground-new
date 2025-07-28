import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";

export async function DELETE(
  req: Request,
  context: { params: { event_id: string } }
) {
  const { event_id } = context.params;

  if (!event_id) {
    return createApiError("Bad Request", 400);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(
      process.env.STATIC_USER_ID!
    );
    await user.deleteEvent(event_id);
    return createApiResponse(null, "删除成功");
  } catch (err) {
    console.error(err);
    return createApiError("删除失败", 500);
  }
}
