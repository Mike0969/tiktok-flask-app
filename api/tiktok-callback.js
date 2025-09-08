// TikTok OAuth Callback for gulf-el.com
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'No authorization code received' });
    }

    const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
    const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
   const REDIRECT_URI =
  process.env.TIKTOK_REDIRECT_URI ||
  'https://tiktok-flask-app1.vercel.app/api/tiktok-callback';
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key: CLIENT_KEY,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
      })
    });

    const data = await response.json();

    if (response.ok && data.access_token) {
      return res.status(200).json({
        success: true,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        open_id: data.open_id
      });
    } else {
      return res.status(400).json({ success: false, details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
