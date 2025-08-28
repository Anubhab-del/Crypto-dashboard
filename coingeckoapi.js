import axios from 'axios'

const API_BASE = 'https://api.coingecko.com/api/v3'
const CACHE_TIME = 60000  // 1 min cache

const getCache = (key) => {
  const cached = localStorage.getItem(key)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_TIME) return data
  }
  return null
}

const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
}

const fetchWithRetry = async (url, retries = 3, backoff = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (err) {
      if (err.response?.status !== 429 || i === retries - 1) throw err
      await new Promise(resolve => setTimeout(resolve, backoff * (2 ** i)))  // Exponential backoff
    }
  }
}

export const fetchMarkets = async (currency) => {
  const key = `markets_${currency}`
  const cached = getCache(key)
  if (cached) return cached
  const data = await fetchWithRetry(`${API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`)
  setCache(key, data)
  return data
}

export const fetchApiChart = async (id, currency, days = 180) => {
  const key = `chart_${id}_${currency}_${days}`
  const cached = getCache(key)
  if (cached) return cached.prices
  const data = await fetchWithRetry(`${API_BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  setCache(key, data)
  return data.prices
}