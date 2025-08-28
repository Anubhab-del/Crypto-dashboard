import React from 'react'
import { useSelector } from 'react-redux'

const Marketcaplist = () => {
  const { cryptos, baseCurrency } = useSelector((state) => state.crypto)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Cryptocurrency by Market Cap</h2>
      <div className="grid grid-cols-3 gap-4 mb-2 text-gray-500 font-semibold">
        <span>Name</span>
        <span className="text-center">Value ({baseCurrency.toUpperCase()})</span>
        <span className="text-right">Change</span>
      </div>
      <ul className="space-y-4 overflow-y-auto max-h-96">
        {cryptos.map((crypto, index) => (
          <li key={crypto.id} className={`grid grid-cols-3 gap-4 items-center p-4 rounded-md ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}>
            <span className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">{crypto.name}</span> 
            <span className="text-gray-600 text-center whitespace-nowrap overflow-hidden text-ellipsis">{crypto.market_cap.toLocaleString()}</span>
            <span className={crypto.price_change_percentage_24h > 0 ? 'text-green-500 font-bold text-right whitespace-nowrap overflow-hidden text-ellipsis' : 'text-red-500 font-bold text-right whitespace-nowrap overflow-hidden text-ellipsis'}>
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Marketcaplist