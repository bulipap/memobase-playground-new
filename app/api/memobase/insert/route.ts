import { createApiResponse, createApiError } from "@/lib/api-response";
import { memoBaseClient } from "@/utils/memobase/client";
import { BlobType, Blob } from "@memobase/memobase";

export async function POST(req: Request) {
  const staticUserId = process.env.STATIC_USER_ID;
  if (!staticUserId) {
    return createApiError("Missing STATIC_USER_ID", 500);
  }

  const { messages } = await req.json();
  if (!messages) {
    return createApiError("参数错误", 400);
  }

  try {
    const user = await memoBaseClient.getOrCreateUser(staticUserId);
    await user.insert(
      Blob.parse({
        type: BlobType.Enum.chat,
        messages: messages,
      }),
      true
    );
    return createApiResponse(null, "插入成功");
  } catch (error) {
    console.error(error);
    return createApiError("插入失败", 500);
  }
}
