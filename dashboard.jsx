import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Currencydropdown from './currencydropdown'
import Searchbar from './searchbar'
import Cryptochart from './chart/cryptochart'
import Charttypedropdown from './chart/charttypedropdown'
import Cryptoselectdropdown from './chart/cryptoselectdropdown'
import Marketcaplist from './sidebar/marketcaplist'
import Piechart from './portfolio/piechart'
import Exchangeform from './exchange/exchangeform'
import { fetchCryptos, fetchChartData } from '../redux/actions/cryptoactions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { baseCurrency, selectedCryptos, error, loading, cryptos } = useSelector((state) => state.crypto)

  useEffect(() => {
    dispatch(fetchCryptos(baseCurrency))
  }, [dispatch, baseCurrency])

  useEffect(() => {
    if (selectedCryptos.length > 0) {
      dispatch(fetchChartData(selectedCryptos, baseCurrency))
    }
  }, [dispatch, selectedCryptos, baseCurrency])

  if (loading) return <div className="text-center p-8 text-lg font-semibold">Loading...</div>
  if (error) return <div className="text-red-500 text-center p-8 text-lg font-semibold">Error: {error}</div>

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <Currencydropdown />
        <Searchbar />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> 
        <div className="lg:col-span-2">  
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
              <Charttypedropdown />
              <Cryptoselectdropdown />
            </div>
            <Cryptochart />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Portfolio</h2>
              <Piechart />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Exchangeform />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md max-h-96 overflow-y-auto">  
          <Marketcaplist />
        </div>
      </div>
    </div>
  )
}

export default Dashboard