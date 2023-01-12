import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { role, isAdmin } = useAuth()

  const content = isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )

  return content
}
export default RequireAuth
