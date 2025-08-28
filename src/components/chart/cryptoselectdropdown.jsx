import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { setSelectedCryptos } from '../../redux/actions/cryptoactions'

const Cryptoselectdropdown = () => {
  const dispatch = useDispatch()
  const { cryptos, selectedCryptos } = useSelector((state) => state.crypto)

  const options = cryptos.map((crypto) => ({
    value: crypto.id,
    label: crypto.name,
  }))

  const handleChange = (selectedOptions) => {
    const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    dispatch(setSelectedCryptos(selectedIds))
  }

  return (
    <Select
      isMulti
      options={options}
      value={options.filter((opt) => selectedCryptos.includes(opt.value))}
      onChange={handleChange}
      placeholder="Select cryptocurrencies"
      className="w-64"  
      classNamePrefix="select"
      maxMenuHeight={200}  
      menuPlacement="auto"  
      isSearchable 
      formatOptionLabel={(option) => (
        <div className="truncate"> 
          {option.label}
        </div>
      )}
    />
  )
}

export default Cryptoselectdropdown