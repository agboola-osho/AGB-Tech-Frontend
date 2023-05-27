import { useState } from "react"
import Logo from "../assets/Logo.png"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import {
  useGetProductBrandsQuery,
  useGetProductCategoriesQuery,
} from "../features/product/productApiSlice"
import { useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Collapse } from "react-bootstrap"

const Nav = ({ show, setShow }) => {
  const navigate = useNavigate()
  const { data: brands } = useGetProductBrandsQuery()
  const { data: categories } = useGetProductCategoriesQuery()
  const [categoriesVisible, setCategoriesVisible] = useState(false)
  const [brandsVisible, setBrandsVisible] = useState(false)
  const { isGuest } = useAuth()
  const [sendLogout] = useSendLogoutMutation()
  const logout = () => {
    sendLogout()
    navigate("login")
  }
  const handleClose = () => {
    setCategoriesVisible(false)
    setBrandsVisible(false)
    setShow(false)
  }
  const handleToggleCategories = (e) => {
    e.stopPropagation()
    setCategoriesVisible(!categoriesVisible)
  }
  const handleToggleBrands = (e) => {
    e.stopPropagation()
    setBrandsVisible(!brandsVisible)
  }
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='logo'>
          <img src={Logo} alt='logo' className='logo' />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body onClick={handleClose}>
        <div className='offcanvas-list'>
          <Link className='offcanvas-item dark-link' to='/'>
          Home
        </Link>
        <Link className='offcanvas-item dark-link' to='contact'>
          Contact
        </Link>
        {isGuest ? (
          <Link className='offcanvas-item dark-link' to='login'>
            Login
          </Link>
        ) : (
          <button className='offcanvas-item' onClick={logout}>
            Logout
          </button>
        )}
        <button
          className='offcanvas-item'
          onClick={handleToggleCategories}
          aria-expanded={categoriesVisible}
          aria-controls='categories'
        >
          <span>Categories</span>
          {categoriesVisible ? (
            <span>
              <Icon
                icon='ic:round-keyboard-arrow-up'
                className='dropdown-icon'
              />
            </span>
          ) : (
            <span>
              <Icon
                icon='ic:round-keyboard-arrow-down'
                className='dropdown-icon'
              />
            </span>
          )}
        </button>
        <Collapse in={categoriesVisible}>
          {categories?.length ? (
            <div className='offcanvas-collapse'>
              {categories.map((category) => (
                <Link
                  className='dark-link offcanvas-sub-item'
                  to={`/categories/${category}`}
                  key={category}
                >
                  {category}
                </Link>
              ))}
            </div>
          ) : (
            <p>Nothing to show here</p>
          )}
        </Collapse>

        <button
          className='offcanvas-item'
          onClick={handleToggleBrands}
        >
          <span>Brands</span>
          {brandsVisible ? (
            <span>
              <Icon
                icon='ic:round-keyboard-arrow-up'
                className='dropdown-icon'
              />
            </span>
          ) : (
            <span>
              <Icon
                icon='ic:round-keyboard-arrow-down'
                className='dropdown-icon'
              />
            </span>
          )}
        </button>

        <Collapse in={brandsVisible}>
          {brands?.length ? (
            <div className='offcanvas-collapse'>
              {brands.map((brand) => (
                <Link
                  className='dark-link offcanvas-sub-item'
                  to={`/brands/${brand}`}
                  key={brand}
                >
                  {brand}
                </Link>
              ))}
            </div>
          ) : (
            <p>Nothing to show here</p>
          )}
        </Collapse>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Nav
