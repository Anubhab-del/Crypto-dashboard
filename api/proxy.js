export default async function handler(req, res) {
  const { path } = req.query;  // Get API path from query
  const url = `https://api.coingecko.com/api/v3/${path}`

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all, or your Vercel URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Network error' });
  }
}