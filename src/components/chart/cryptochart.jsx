import React from 'react'
import { useSelector } from 'react-redux'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']

const Cryptochart = () => {
  const { chartType, chartData } = useSelector((state) => state.crypto)

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 }, color: '#4B5563' } },  // Better legend styling
      tooltip: { backgroundColor: '#F9FAFB', titleColor: '#111827', bodyColor: '#111827' },  // Light tooltip
    },
    scales: {
      x: { grid: { color: '#E5E7EB' } },  // Light grid lines
      y: { grid: { color: '#E5E7EB' } },
    },
    indexAxis: chartType === 'bar horizontal' ? 'y' : 'x',
  }

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((ds, index) => ({
      ...ds,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      tension: 0.4,  // Smoother lines
      pointRadius: 4,  // Visible points
    })),
  }

  if (chartType === 'line') {
    return <Line options={options} data={data} />
  } else {
    return <Bar options={options} data={data} />
  }
}

export default Cryptochart