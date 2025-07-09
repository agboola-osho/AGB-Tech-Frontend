import Logo from "../../assets/Logo.png"
import { useRef, useState, useEffect } from "react"
import { useLoginMutation, useSendEmailMutation } from "./authApiSlice"
import { setEmailDetails } from "./authSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setToken } from "./authSlice"
import { toast, ToastContainer } from "react-toastify"
import Loader from "../../components/Loader"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading }] = useLoginMutation()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const [sendEmail, { isLoading: sending }] = useSendEmailMutation()
  const navigate = useNavigate()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  let allowSubmit = false
  if (email === "" || password === "") {
    allowSubmit = false
  } else {
    allowSubmit = true
  }
  const tryOut = async () => {
    setEmail("guestuser@something.com")
    setPassword("agb24789")
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
        if (err.data.message === "Verify Your email") {
          const emailDetails = {
            btnContent: "Verify Your Email",
            message1: "You recently created an AGB Tech account",
            message2:
              "Verify your email by clicking  this button, the link will expire in 15 minutes so use it as fast asyou can",
            title: "Verify Your Email",
            header: "Verify Your Email",
            email,
            operation: "verifyEmail",
          }

          await sendEmail(emailDetails).unwrap()
          dispatch(setEmailDetails(emailDetails))
          navigate("/emailSent")
        } else {
          toast.error(err?.data?.message, {
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
          {isLoading || sending ? <Loader /> : "Login"}
        </button>
        <button onClick={tryOut} className='form-submit'>
          Try it out (as an admin)
        </button>
      </form>
      <Link to='/signup'>Don't have an account? Signup</Link>
      <Link to='/resetPassword'>Forgot Password</Link>
      <ToastContainer />
    </main>
  )
}

export default Login
