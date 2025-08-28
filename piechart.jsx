import React from 'react'
import { useSelector } from 'react-redux'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Piechart = () => {
  const { portfolio, prices } = useSelector((state) => state.crypto)

  const data = {
    labels: portfolio.map((p) => p.name),
    datasets: [
      {
        data: portfolio.map((p) => p.amount * (prices[p.id] || 1)),
        backgroundColor: portfolio.map((p) => p.color),
        borderWidth: 2,
        borderColor: '#FFFFFF',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', align: 'center', labels: { font: { size: 14 }, color: '#4B5563', padding: 20, boxWidth: 12 } },  // Centered, padded, smaller boxes
      tooltip: { backgroundColor: '#F9FAFB', titleColor: '#111827', bodyColor: '#111827' },
    },
  }

  return <div className="h-64 mx-auto max-w-xs"> 
    <Pie data={data} options={options} />
  </div>
}

export default Piechart