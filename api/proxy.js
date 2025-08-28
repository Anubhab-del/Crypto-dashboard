export default async function handler(req, res) {
  const { path } = req.query
  const url = `https://api.coingecko.com/api/v3/${path}`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const data = await response.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}