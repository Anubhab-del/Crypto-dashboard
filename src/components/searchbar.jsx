import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedCryptos } from '../redux/actions/cryptoactions'

const Searchbar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      dispatch(setSelectedCryptos([search.toLowerCase()]))
      setSearch('')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by coin"
        className="border rounded-l p-2 w-64 transition-border hover:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-r p-2 hover:bg-blue-600 transition duration-300">
        Search
      </button>
    </form>
  )
}

export default Searchbar