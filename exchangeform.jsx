import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePortfolio } from '../../redux/actions/cryptoactions'

const Exchangeform = () => {
  const [sellCoin, setSellCoin] = useState('bitcoin')
  const [sellAmount, setSellAmount] = useState('')
  const [buyCoin, setBuyCoin] = useState('ethereum')
  const [buyAmount, setBuyAmount] = useState('')
  const [error, setError] = useState(null)
  const { prices } = useSelector((state) => state.crypto)
  const dispatch = useDispatch()

  const handleSellChange = (e) => {
    const amount = e.target.value
    setSellAmount(amount)
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setBuyAmount('')
      setError('Invalid number')
      return
    }
    const sellPrice = prices[sellCoin] || 1  // Fallback to 1 if missing/0
    const buyPrice = prices[buyCoin] || 1  // Fallback to 1
    if (sellPrice === 0 || buyPrice === 0) {
      setError('Price data unavailable for selected coins')
      setBuyAmount('')
      return
    }
    setBuyAmount((parseFloat(amount) * sellPrice / buyPrice).toFixed(6))
    setError(null)
    console.log('Calculation: sellPrice', sellPrice, 'buyPrice', buyPrice, 'buyAmount', buyAmount)  // Debug
  }

  const handleExchange = () => {
    if (!error && sellAmount > 0 && buyAmount) {  // Added buyAmount check
      dispatch(updatePortfolio(sellCoin, -parseFloat(sellAmount), buyCoin, parseFloat(buyAmount)))
      setSellAmount('')
      setBuyAmount('')
      console.log('Exchanged: sold', sellAmount, sellCoin, 'bought', buyAmount, buyCoin)  // Debug
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Exchange Coins</h2>
      <div className="mb-4">
        <label className="font-medium text-green-600">Buy</label>
        <select value={buyCoin} onChange={(e) => setBuyCoin(e.target.value)} className="border rounded p-2 w-full mt-1">
          <option value="ethereum">Ethereum</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="tether">Tether</option>
        </select>
        <input
          type="text"
          value={buyAmount}
          readOnly
          className="border rounded p-2 w-full mt-1 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="font-medium text-red-600">Sell</label>
        <select value={sellCoin} onChange={(e) => setSellCoin(e.target.value)} className="border rounded p-2 w-full mt-1">
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tether">Tether</option>
        </select>
        <input
          type="text"
          value={sellAmount}
          onChange={handleSellChange}
          placeholder="Amount"
          className="border rounded p-2 w-full mt-1"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="button" onClick={handleExchange} className="bg-blue-600 text-white rounded p-2 w-full hover:bg-blue-700 transition">
        Exchange
      </button>
    </div>
  )
}

export default Exchangeform