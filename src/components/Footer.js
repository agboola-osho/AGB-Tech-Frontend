import useAuth from "../hooks/useAuth"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const Footer = () => {
  const { isAdmin } = useAuth()
  let footerBtn
  if (isAdmin) {
    footerBtn = (
      <footer>
        <button className='footer'>
          <Link to='/admin/addProduct' className='white-link'>
            <Icon icon='ph:plus-fill' />
          </Link>
        </button>
      </footer>
    )
  }

  return footerBtn
}

export default Footer
