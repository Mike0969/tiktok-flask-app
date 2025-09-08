# Gulf-El TikTok OAuth Callback

This project provides a Vercel serverless function that handles TikTok OAuth authorization flow.

## Deploying

1. Upload these files to your GitHub repo.
2. Connect repo to Vercel → Deploy.
3. Add environment variables in Vercel:
   - TIKTOK_CLIENT_KEY
   - TIKTOK_CLIENT_SECRET
   - TIKTOK_REDIRECT_URI
4. Update TikTok Developer Console with redirect:
   https://your-vercel-app.vercel.app/api/tiktok-callback

## Test OAuth
https://www.tiktok.com/v2/auth/authorize?client_key=YOUR_CLIENT_KEY&response_type=code&scope=user.info.basic,video.upload&redirect_uri=https%3A%2F%2Fyour-vercel-app.vercel.app%2Fapi%2Ftiktok-callback
