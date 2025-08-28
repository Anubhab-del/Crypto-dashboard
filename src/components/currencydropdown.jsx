import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBaseCurrency } from '../redux/actions/cryptoactions'

const currencies = [
  { value: 'usd', label: 'USD' },
  { value: 'inr', label: 'INR' },
  { value: 'eur', label: 'EUR' },
]

const Currencydropdown = () => {
  const dispatch = useDispatch()
  const baseCurrency = useSelector((state) => state.crypto.baseCurrency)

  const handleChange = (e) => {
    dispatch(setBaseCurrency(e.target.value))
  }

  return (
    <select
      value={baseCurrency}
      onChange={handleChange}
      className="border rounded p-2 transition-border hover:border-blue-500"
    >
      {currencies.map((curr) => (
        <option key={curr.value} value={curr.value}>
          {curr.label}
        </option>
      ))}
    </select>
  )
}

export default Currencydropdown