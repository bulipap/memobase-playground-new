import { MemoBaseClient } from "@memobase/memobase";

const url = process.env.NEXT_PUBLIC_MEMOBASE_PROJECT_URL;
const key = process.env.NEXT_PUBLIC_MEMOBASE_API_KEY;

console.log("[Build check] NEXT_PUBLIC_MEMOBASE_PROJECT_URL:", url);
console.log("[Build check] NEXT_PUBLIC_MEMOBASE_API_KEY:", key);

if (!url || !key) {
  throw new Error("❌ Missing MemoBase env vars at build time");
}

export const memoBaseClient = new MemoBaseClient(url, key);
