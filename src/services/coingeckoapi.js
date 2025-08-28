import axios from 'axios'

const PROXY_BASE = process.env.NODE_ENV === 'production' ? '/api/proxy' : 'http://localhost:5173/api/proxy'  // Vercel auto-routes /api

const fetchWithProxy = async (path) => {
  const res = await axios.get(`${PROXY_BASE}?path=${encodeURIComponent(path)}`)
  return res.data
}

export const fetchMarkets = async (currency) => {
  return fetchWithProxy(`coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`)
}

export const fetchApiChart = async (id, currency, days = 180) => {
  const data = fetchWithProxy(`coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  return data.prices
}