import { useState, useEffect } from "react"
import Logo from "../assets/Logo.png"
import { Icon } from "@iconify/react"
import { useGetProductsQuery } from "../features/product/productApiSlice"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import SmallSearch from "./SmallSearch"
import Nav from "./Offcanvas"
import AutoComplete from "./AutoComplete"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const Header = ({ length }) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false)
  const [show, setShow] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`search?q=${search}`)
  }
  const [animate] = useAutoAnimate()
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
    }, 200)
  }
  return (
    <>
      <div className='head'>
        <div className='head-group'>
          <button className='offcanvas-toggler' onClick={() => setShow(true)}>
            <Icon icon='tabler:menu-2' className='offcanvas-icon' />
          </button>
          <Nav show={show} setShow={setShow} />
          <div className='logo'>
            <Link to='/'>
              <img src={Logo} alt='logo' className='logo' />
            </Link>
          </div>
        </div>
        <div className='search' ref={animate}>
          <div className='search-bar'>
            <form onSubmit={handleSubmit} className='search-form'>
              <label htmlFor='search' className='d-none'>
                Search
              </label>
              <Icon icon='fa:search' className='search-icon' inline={true} />
              <input
                type='text'
                name='search'
                id='search'
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
        <div>
          <button className='icon'>
            <Link to='user' className='icon'>
              <Icon icon='fa6-solid:user' inline={true} />
            </Link>
          </button>
          <button className='icon cart-icon'>
            <Link to='Cart' className='icon'>
              <Icon icon='fa6-solid:bag-shopping' inline={true} />
              <span className='cart-length'>{length}</span>
            </Link>
          </button>
        </div>
      </div>
      <SmallSearch />
    </>
  )
}

export default Header
