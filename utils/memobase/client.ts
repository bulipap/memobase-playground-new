import { MemoBaseClient } from "@memobase/memobase";

// ✅ Allow both frontend (NEXT_PUBLIC_*) and backend (server-only) environments
const url =
  process.env.MEMOBASE_PROJECT_URL || process.env.NEXT_PUBLIC_MEMOBASE_PROJECT_URL;
const key =
  process.env.MEMOBASE_API_KEY || process.env.NEXT_PUBLIC_MEMOBASE_API_KEY;

console.log("[Build check] MEMOBASE_PROJECT_URL:", url);
console.log("[Build check] MEMOBASE_API_KEY:", key);

if (!url || !key) {
  throw new Error("❌ Missing MemoBase env vars at build time");
}

export const memoBaseClient = new MemoBaseClient(url, key);
