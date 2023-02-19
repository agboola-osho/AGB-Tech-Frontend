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
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='logo'>
          <img src={Logo} alt='logo' className='logo' />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
              aria-expanded={categoriesVisible}
              aria-controls='categories'
            >
              <span>Categories</span>
              {categoriesVisible ? (
                <Icon
                  icon='ic:round-keyboard-arrow-up'
                  className='dropdown-icon'
                />
              ) : (
                <Icon
                  icon='ic:round-keyboard-arrow-down'
                  className='dropdown-icon'
                />
              )}
            </button>
          </li>
          <Collapse in={categoriesVisible}>
            {categories?.length ? (
              <ul>
                {categories.map((category) => (
                  <Link
                    className='dark-link'
                    to={`/categories/${category}`}
                    key={category}
                  >
                    <li className='offcanvas-sub-item'>{category}</li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p>Nothing to show here</p>
            )}
          </Collapse>

          <li className='offcanvas-item'>
            <button
              className='offcanvas-btn'
              onClick={() => setBrandsVisible(!brandsVisible)}
            >
              <span>Brands</span>
              {brandsVisible ? (
                <Icon
                  icon='ic:round-keyboard-arrow-up'
                  className='dropdown-icon'
                />
              ) : (
                <Icon
                  icon='ic:round-keyboard-arrow-down'
                  className='dropdown-icon'
                />
              )}
            </button>
          </li>
          <Collapse in={brandsVisible}>
            {brands?.length ? (
              <ul>
                {brands.map((brand) => (
                  <Link
                    className='dark-link'
                    to={`/brands/${brand}`}
                    key={brand}
                  >
                    <li className='offcanvas-sub-item'>{brand}</li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p>Nothing to show here</p>
            )}
          </Collapse>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Nav
