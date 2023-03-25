import { useGetUserQuery, useSendLogoutMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import format from "date-fns/format"
import Spinner from "../../components/Spinner"

const User = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const [sendLogout] = useSendLogoutMutation()
  const navigate = useNavigate()
  const logout = async () => {
    await sendLogout()
    navigate("/login")
  }
  let content
  if (isLoading) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error?.data?.message}</p>
  } else if (user) {
    const date = format(new Date(user.createdAt), "MMMMMMM dd yyyy")
    content = (
      <main className='user'>
        <article className='user-details'>
          <div className='user-profile'>
            <img
              src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
              alt={user.name}
            />
            <p>{user.name}</p>
          </div>
          <p className='user-text'>Customer since: {date}</p>
          <p className='user-text'>Email: {user.email.slice(0, 15)}...</p>
          <button className='user-btn' onClick={logout}>
            Logout
          </button>
        </article>
      </main>
    )
  }
  return content
}

export default User
