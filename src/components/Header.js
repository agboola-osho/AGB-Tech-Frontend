import { useState } from "react"
import Logo from "../assets/Logo.png"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import {
  useGetProductBrandsQuery,
  useGetProductCategoriesQuery,
} from "../features/product/productApiSlice"

const Header = ({ length }) => {
  const { isGuest } = useAuth()
  const navigate = useNavigate()
  const [categoriesVisible, setCategoriesVisible] = useState(false)
  const [brandsVisible, setBrandsVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [sendLogout] = useSendLogoutMutation()
  const { data: brands } = useGetProductBrandsQuery()
  const { data: categories } = useGetProductCategoriesQuery()
  const logout = () => {
    sendLogout()
    navigate("login")
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`searchResults/${search}`)
  }
  return (
    <>
      <div className='head'>
        <div className='head-group'>
          <button
            className='offcanvas-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvas'
            aria-controls='offcanvas'
          >
            <Icon icon='tabler:menu-2' className='offcanvas-icon' />
          </button>

          <div
            className='offcanvas offcanvas-start'
            tabIndex='-1'
            id='offcanvas'
            aria-labelledby='offcanvasExampleLabel'
          >
            <div className='offcanvas-header'>
              <div className='logo offcanvas-title'>
                <img src={Logo} alt='logo' className='logo' />
              </div>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='offcanvas-body'>
              <ul className='offcanvas-list'>
                <Link className='dark-link' to='/'>
                  <li className='offcanvas-item'>Home</li>
                </Link>
                <Link className='dark-link' to='contact'>
                  <li className='offcanvas-item'>Contact</li>
                </Link>
                {isGuest ? (
                  <Link className='dark-link' to='login'>
                    <li className='offcanvas-item'>Login</li>
                  </Link>
                ) : (
                  <button className='offcanvas-btn' onClick={logout}>
                    <li className='offcanvas-item'>Logout</li>
                  </button>
                )}
                <li className='offcanvas-item'>
                  <button
                    className='offcanvas-btn'
                    onClick={() => setCategoriesVisible(!categoriesVisible)}
                  >
                    <span>Categories</span>
                    <Icon
                      icon='ic:round-keyboard-arrow-down'
                      className='dropdown-icon'
                    />
                  </button>
                </li>
                {categoriesVisible
                  ? categories.map((category) => (
                      <Link
                        className='dark-link'
                        to={`/categories/${category}`}
                      >
                        <li className='offcanvas-sub-item'>{category}</li>
                      </Link>
                    ))
                  : null}
                <li className='offcanvas-item'>
                  <button
                    className='offcanvas-btn'
                    onClick={() => setBrandsVisible(!brandsVisible)}
                  >
                    <span>Brands</span>
                    <Icon
                      icon='ic:round-keyboard-arrow-down'
                      className='dropdown-icon'
                    />
                  </button>
                </li>
                {brandsVisible
                  ? brands.map((brand) => (
                      <Link className='dark-link' to={`/brands/${brand}`}>
                        <li className='offcanvas-sub-item'>{brand}</li>
                      </Link>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className='logo'>
            <Link to='/'>
              <img src={Logo} alt='' className='logo' />
            </Link>
          </div>
        </div>
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
            />
            <button className='search-btn'>
              <Icon icon='fa:search' inline={true} />
            </button>
          </form>
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
          />
          <button className='search-btn'>
            <Icon icon='fa:search' inline={true} />
          </button>
        </form>
      </div>
    </>
  )
}

export default Header
