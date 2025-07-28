# Memobase Playground (Dockerized for Render)

This version is ready for deployment to [Render.com](https://render.com) using Docker.

## ✅ Steps to Deploy on Render

1. Push this repo to your own GitHub
2. Go to [Render Dashboard](https://dashboard.render.com) → New Web Service
3. Select **Docker** as Environment
4. Leave Build and Start command empty (Dockerfile is used)
5. Add these environment variables:

| Key                             | Value                                                   |
|----------------------------------|-----------------------------------------------------------|
| `MEMOBASE_API_KEY`               | `your-api-key`                                            |
| `MEMOBASE_API_URL`               | `https://your-backend.onrender.com`                       |
| `STATIC_USER_ID`                 | `your-user-id`                                            |
| `NEXT_PUBLIC_MEMOBASE_API_KEY`   | `your-api-key`                                            |
| `NEXT_PUBLIC_MEMOBASE_PROJECT_URL` | `https://your-backend.onrender.com`                    |

6. Deploy and enjoy!

## 🛠 Dev scripts

```bash
pnpm install
pnpm dev      # local dev
pnpm build    # production build
pnpm start    # run production
```