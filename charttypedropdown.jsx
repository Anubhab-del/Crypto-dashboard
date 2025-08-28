import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChartType } from '../../redux/actions/cryptoactions';

const types = ['line', 'bar', 'bar horizontal']

const Charttypedropdown = () => {
  const dispatch = useDispatch()
  const chartType = useSelector((state) => state.crypto.chartType)

  const handleChange = (e) => {
    dispatch(setChartType(e.target.value))
  }

  return (
    <select value={chartType} onChange={handleChange} className="border rounded p-2">
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default Charttypedropdown