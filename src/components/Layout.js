import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
