import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import Spinner from "../../components/Spinner"

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const location = useLocation()

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try{
          await refresh().unwrap()
        } catch (err){
          content = <Navigate to='/login' state={{ from: location }} replace />
        }
        
      }

      if (!token) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
  }, [])

  let content
  if (isLoading) {
    content = <Spinner />
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
