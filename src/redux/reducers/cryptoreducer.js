const initialState = {
  baseCurrency: 'usd',
  cryptos: [],
  prices: {},
  selectedCryptos: ['bitcoin', 'ethereum'],
  chartType: 'line',
  chartData: { labels: [], datasets: [] },
  portfolio: [
    { id: 'tether', name: 'Tether', amount: 375, color: '#3B82F6' },
    { id: 'luna', name: 'Luna', amount: 375, color: '#EC4899' },
    { id: 'ethereum', name: 'Ethereum', amount: 250, color: '#10B981' },
    { id: 'bitcoin', name: 'Bitcoin', amount: 0, color: '#F59E0B' },  // Added Bitcoin with 0 amount for example to work
  ],
  error: null,
  loading: false,
}

const cryptoreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BASE_CURRENCY':
      return { ...state, baseCurrency: action.payload }
    case 'SET_CHART_TYPE':
      return { ...state, chartType: action.payload }
    case 'SET_SELECTED_CRYPTOS':
      return { ...state, selectedCryptos: action.payload }
    case 'SET_CRYPTOS':
      return { ...state, cryptos: action.payload }
    case 'SET_PRICES':
      return { ...state, prices: action.payload }
    case 'SET_CHART_DATA':
      return { ...state, chartData: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'UPDATE_PORTFOLIO':
      const { sellId, sellAmount, buyId, buyAmount } = action.payload
      let newPortfolio = [...state.portfolio]
      let sellIndex = newPortfolio.findIndex(p => p.id === sellId)
      let buyIndex = newPortfolio.findIndex(p => p.id === buyId)

      if (sellIndex === -1) {
        newPortfolio.push({ id: sellId, name: sellId.charAt(0).toUpperCase() + sellId.slice(1), amount: sellAmount, color: '#F59E0B' })  // Add if not present
      } else {
        newPortfolio[sellIndex].amount += sellAmount
        if (newPortfolio[sellIndex].amount <= 0) newPortfolio.splice(sellIndex, 1)  // Remove if 0 or negative
      }

      if (buyIndex === -1) {
        newPortfolio.push({ id: buyId, name: buyId.charAt(0).toUpperCase() + buyId.slice(1), amount: buyAmount, color: '#10B981' })  // Add if not present
      } else {
        newPortfolio[buyIndex].amount += buyAmount
      }

      return { ...state, portfolio: newPortfolio }
    default:
      return state
  }
}

export default cryptoreducer