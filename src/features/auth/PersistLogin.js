import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import Spinner from "../../components/Spinner"

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const location = useLocation()
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
          console.log(error)
        }
        setTrueSuccess(true)
      }

      if (!token) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
  }, [])

  let content
  if (isLoading) {
    content = <Outlet />
  } else if (isError) {
    content = <Navigate to='/login' state={{ from: location }} replace />
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />
  } else if (token && isUninitialized) {
    content = <Outlet />
  }

  return content
}
export default PersistLogin
