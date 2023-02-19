import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isAdmin = false
  let isUser = false
  let isGuest = true

  if (token) {
    const decoded = jwtDecode(token)
    const { role, name, user } = decoded.UserInfo
    if (role === 1960) isAdmin = true
    if (role === 2009) isUser = true
    isGuest = false

    return { isAdmin, isGuest, isUser, name, user }
  }

  return { isAdmin, isGuest, isUser, name: "", user: "" }
}
export default useAuth
