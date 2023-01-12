import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import Spinner from "../../components/Spinner"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token")
        const response = await refresh()
        if (response.error) {
          const error = response.error
          toast.error(error.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          })
        }
        setTrueSuccess(true)
      }

      if (!token) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
  }, [])

  let content
  if (isLoading) {
    content = <Spinner />
  } else if (isError) {
    content = (
      <>
        <Outlet />
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme='light'
        />
      </>
    )
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />
  } else if (token && isUninitialized) {
    content = <Outlet />
  }

  return content
}
export default PersistLogin
