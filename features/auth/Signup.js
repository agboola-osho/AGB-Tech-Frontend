import { useEffect, useRef, useState } from "react"
import Logo from "../../assets/Logo.png"
import { Link } from "react-router-dom"
import { useSignupMutation, useSendEmailMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import { setEmailDetails } from "./authSlice"
import Loader from "../../components/Loader"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const inputRef = useRef()
  const [signup, { isLoading }] = useSignupMutation()
  const [sendEmail, { isLoading: sending }] = useSendEmailMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  let allowSubmit = false
  if (name === "" || email === "" || password === "") {
    allowSubmit = false
  } else {
    allowSubmit = true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signup({
        name,
        email,
        password,
      }).unwrap()
      setEmail("")
      setPassword("")
      setName("")
      if (data.message === "Verify Your Email") {
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
      }
    } catch (err) {
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
          {isLoading || sending ? <Loader /> : "Signup"}
        </button>
      </form>
      <Link to='/login'>Already have an account? Login</Link>
      <ToastContainer />
    </main>
  )
}
export default Signup
