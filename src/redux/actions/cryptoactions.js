import { format } from 'date-fns'
import { fetchMarkets, fetchApiChart } from '../../services/coingeckoapi'
import { setCryptos, setPrices, setChartData, setError } from '../actions'  // Assume you have these actions; adjust if needed

export const fetchCryptos = (currency) => async (dispatch) => {
  try {
    const data = await fetchMarkets(currency)
    if (!data) throw new Error('No data returned')
    dispatch(setCryptos(data))
    const prices = data.reduce((acc, c) => ({ ...acc, [c.id]: c.current_price }), {})
    dispatch(setPrices(prices))
  } catch (err) {
    dispatch(setError(err.message))
  }
}

export const fetchChartData = (cryptos, currency) => async (dispatch) => {
  try {
    const labels = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      labels.push(format(date, 'MMM'))
    }

    const datasets = []
    for (const id of cryptos) {
      const prices = await fetchApiChart(id, currency)
      if (!prices) throw new Error('No chart data returned')
      const monthlyData = new Array(labels.length).fill(0)
      const counts = new Array(labels.length).fill(0)
      prices.forEach(([timestamp, price]) => {  // Fixed syntax: added ) after [timestamp, price]
        const month = format(new Date(timestamp), 'MMM')
        const index = labels.indexOf(month)
        if (index !== -1) {
          monthlyData[index] += price
          counts[index] += 1
        }
      })
      const averaged = monthlyData.map((sum, idx) => (counts[idx] > 0 ? sum / counts[idx] : 0))
      datasets.push({ label: id.charAt(0).toUpperCase() + id.slice(1), data: averaged })
    }

    dispatch(setChartData({ labels, datasets }))
  } catch (err) {
    dispatch(setError(err.message))
  }
}