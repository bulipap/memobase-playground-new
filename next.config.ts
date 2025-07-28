import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  env: {
    MEMOBASE_API_KEY: process.env.MEMOBASE_API_KEY,
    MEMOBASE_API_URL: process.env.MEMOBASE_API_URL, // ✅ <-- This fixes the .replace error
    STATIC_USER_ID: process.env.STATIC_USER_ID,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      resourceQuery: /raw/,
      type: 'asset/source',
    });
    return config;
  },
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
