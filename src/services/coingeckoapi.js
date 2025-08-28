import axios from 'axios'

const API_BASE = 'https://api.coingecko.com/api/v3'
const PROXY_BASE = process.env.NODE_ENV === 'production' ? '/api/proxy' : API_BASE  // Proxy in prod, direct in dev

const fetchWithErrorHandling = async (path) => {
  try {
    const url = process.env.NODE_ENV === 'production' ? `${PROXY_BASE}?path=${encodeURIComponent(path)}` : `${API_BASE}/${path}`
    const res = await axios.get(url, { timeout: 10000 })
    return res.data
  } catch (err) {
    console.error('API error:', err.message)
    return null  // Fallback null, callers handle
  }
}

export const fetchMarkets = async (currency) => {
  const path = `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`
  const data = await fetchWithErrorHandling(path)
  return data || []  // Empty fallback
}

export const fetchApiChart = async (id, currency, days = 180) => {
  const path = `coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  const data = await fetchWithErrorHandling(path)
  return (data && data.prices) || []  // Empty fallback
}