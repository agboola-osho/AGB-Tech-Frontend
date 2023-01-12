import Logo from "../../assets/Logo.png"
import { useRef, useState, useEffect } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setToken } from "./authSlice"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading }] = useLoginMutation()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  let allowSubmit = false
  let loader
  if (email === "" || password === "") {
    allowSubmit = false
  } else {
    allowSubmit = true
  }
  if (isLoading) {
    loader = (
      <span
        className='spinner-border spinner-border-sm'
        role='status'
        aria-hidden='true'
      ></span>
    )
  }
  const tryOut = async () => {
    setEmail("guest@something.com")
    setPassword("123456789")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email !== "" || password !== "") {
      try {
        const { accessToken } = await login({ email, password }).unwrap()
        dispatch(setToken(accessToken))
        setEmail("")
        setPassword("")
        navigate("/")
      } catch (err) {
        toast.error(err.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      }
    }
  }
  return (
    <main className='auth-container'>
      <div className='form-logo-container'>
        <img src={Logo} alt='logo' className='form-logo' />
      </div>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='input-container'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='auth-input border-danger'
            id='email'
            value={email}
            ref={inputRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className=' auth-input border-danger'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='form-submit' disabled={!allowSubmit}>
          {loader} Login
        </button>
        <button onClick={tryOut}>Try it out (as an admin)</button>
      </form>
      <Link to='/signup'>Don't have an account? Signup</Link>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  )
}

export default Login
