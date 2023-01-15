import { useEffect, useRef, useState } from "react"
import Logo from "../../assets/Logo.png"
import { Link } from "react-router-dom"
import { useSignupMutation } from "./authApiSlice"
import { setToken } from "./authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const inputRef = useRef()
  const [signup, { isLoading, isSuccess }] = useSignupMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  let allowSubmit = false
  let loader
  if (name === "" || email === "" || password === "") {
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await signup({
        name,
        email,
        password,
      }).unwrap()
      dispatch(setToken(accessToken))
      setEmail("")
      setPassword("")
      setName("")
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
  return (
    <main className='auth-container'>
      <div className='form-logo-container'>
        <img src={Logo} alt='logo' className='form-logo' />
      </div>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className='input-container'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='name'
            className='auth-input border-danger'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            className='auth-input border-danger'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className=' auth-input'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='form-submit' disabled={!allowSubmit}>
          {loader} Signup
        </button>
      </form>
      <Link to='/login'>Already have an account? Login</Link>
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
export default Signup
