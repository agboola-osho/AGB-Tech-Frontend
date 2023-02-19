import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import AutoComplete from "./AutoComplete"
import { useGetProductsQuery } from "../features/product/productApiSlice"
const SmalSearch = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`search?q=${search}`)
  }
  const { data: products } = useGetProductsQuery()
  useEffect(() => {
    if (products?.length && search !== "") {
      const filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      )
      setSearchResults(filteredProducts)
    }
  }, [search, products])
  const handleBlur = () => {
    setTimeout(() => {
      setAutoCompleteVisible(false)
    }, 100)
  }
  return (
    <div className='search'>
      <div className='small-search'>
        <form onSubmit={handleSubmit} className='search-form'>
          <label htmlFor='small-search' className='d-none'>
            Search
          </label>
          <Icon icon='fa:search' className='search-icon' inline={true} />
          <input
            type='text'
            name='search'
            id='small-search'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setAutoCompleteVisible(true)}
            onBlur={handleBlur}
            autoComplete='off'
          />
          <button className='search-btn'>
            <Icon icon='fa:search' inline={true} />
          </button>
        </form>
      </div>
      {autoCompleteVisible && search !== "" && (
        <AutoComplete data={searchResults} setSearch={setSearch} />
      )}
    </div>
  )
}

export default SmalSearch
