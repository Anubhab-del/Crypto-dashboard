import { format } from 'date-fns'
import { fetchMarkets, fetchApiChart } from '../../services/coingeckoapi';

export const setBaseCurrency = (currency) => ({
  type: 'SET_BASE_CURRENCY',
  payload: currency,
})

export const setChartType = (type) => ({
  type: 'SET_CHART_TYPE',
  payload: type,
})

export const setSelectedCryptos = (cryptos) => ({
  type: 'SET_SELECTED_CRYPTOS',
  payload: cryptos,
})

export const setCryptos = (cryptos) => ({
  type: 'SET_CRYPTOS',
  payload: cryptos,
})

export const setPrices = (prices) => ({
  type: 'SET_PRICES',
  payload: prices,
})

export const setChartData = (data) => ({
  type: 'SET_CHART_DATA',
  payload: data,
})

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
})

export const updatePortfolio = (sellId, sellAmount, buyId, buyAmount) => ({
  type: 'UPDATE_PORTFOLIO',
  payload: { sellId, sellAmount, buyId, buyAmount },
})

export const fetchCryptos = (currency) => async (dispatch) => {
  try {
    const data = await fetchMarkets(currency)
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
      const monthlyData = new Array(labels.length).fill(0)
      const counts = new Array(labels.length).fill(0)
      prices.forEach(([timestamp, price]) => {
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