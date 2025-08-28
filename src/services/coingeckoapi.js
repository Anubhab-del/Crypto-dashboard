import axios from 'axios'

const API_BASE = 'https://api.coingecko.com/api/v3'

export const fetchMarkets = async (currency) => {
  try {
    const res = await axios.get(`${API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`)
    return res.data || [] 
  } catch (err) {
    console.error('fetchMarkets error:', err.message)  
    return [] 
  }
}

export const fetchApiChart = async (id, currency, days = 180) => {
  try {
    const res = await axios.get(`${API_BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
    return res.data.prices || [] 
  } catch (err) {
    console.error('fetchApiChart error:', err.message)  
    return []  
  }
}