import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./features/product/Home"
import Cart from "./features/cart/Cart"
import User from "./features/auth/User"
import Contact from "./components/Contact"
import SearchResults from "./features/product/SearchResults"
import Categories from "./features/product/Categories"
import Missing from "./components/Missing"
import Product from "./features/product/Product"
import Brands from "./features/product/Brands"
import Login from "./features/auth/Login"
import Signup from "./features/auth/Signup"
import PersistLogin from "./features/auth/PersistLogin"
import Protected from "./features/auth/Protected"
import AddNewProduct from "./features/product/AddNewProduct"
import EditProduct from "./features/product/EditProduct"

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='/' element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path='product'>
            <Route path=':id' element={<Product />} />
          </Route>
          <Route path='admin' element={<Protected allowedRoles={[1960]} />}>
            <Route path='addProduct' element={<AddNewProduct />} />
            <Route path='editProduct'>
              <Route path=':id' element={<EditProduct />} />
            </Route>
          </Route>
          <Route path='contact' element={<Contact />} />
          <Route path='user' element={<User />} />
          <Route path='cart' element={<Cart />} />
          <Route path='searchResults/:query' element={<SearchResults />} />
          <Route path='categories'>
            <Route path=':category' element={<Categories />} />
          </Route>
          <Route path='brands'>
            <Route path=':brand' element={<Brands />} />
          </Route>
          <Route path='*' element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
