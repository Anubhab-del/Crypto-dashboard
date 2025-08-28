import axios from 'axios'

const API_BASE = 'https://api.coingecko.com/api/v3'

export const fetchMarkets = async (currency) => {
  const res = await axios.get(`${API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`)
  return res.data
}

export const fetchApiChart = async (id, currency, days = 180) => {
  const res = await axios.get(`${API_BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  return res.data.prices
}