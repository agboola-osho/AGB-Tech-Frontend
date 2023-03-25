import React from "react"
import ReactDOM from "react-dom/client"
import { store } from "./app/store"
import "./index.css"
import { Provider } from "react-redux"
import App from "./App"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap"
import "react-toastify/dist/ReactToastify.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
