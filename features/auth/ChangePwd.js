import { useState, useRef, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useResetPasswordMutation, useSendEmailMutation } from "./authApiSlice"
import { ToastContainer, toast } from "react-toastify"
import jwtDecode from "jwt-decode"
import Loader from "../../components/Loader"
import Logo from "../../assets/Logo.png"

const ChangePwd = () => {
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [searchParams] = useSearchParams()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [sendEmail, { isLoading: sending }] = useSendEmailMutation()
  const navigate = useNavigate()
  const token = searchParams.get("token")
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await resetPassword({
        password,
        token,
      }).unwrap()
      const { email } = jwtDecode(token)
      const emailDetails = {
        btnContent: "Reset Your Password",
        message1: "Your AGB Tech account password has recently been changed",
        message2: "If you didn't do it then:",
        title: "Password Reset",
        header: "Pssword Reset",
        email,
        operation: "changePwd",
      }
      await sendEmail(emailDetails)
      navigate("/login")
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
  let allowSubmit
  if (
    password === "" ||
    passwordConfirmation === "" ||
    password !== passwordConfirmation
  ) {
    allowSubmit = false
  } else {
    allowSubmit = true
  }
  return (
    <main className='auth-container'>
      <div className='form-logo-container'>
        <img src={Logo} alt='logo' className='form-logo' />
      </div>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <div className='input-container'>
          <label htmlFor='email'>Password</label>
          <input
            type='password'
            className='auth-input border-danger'
            id='email'
            value={password}
            ref={inputRef}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            className=' auth-input border-danger'
            id='password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button className='form-submit' disabled={!allowSubmit}>
          {isLoading || sending ? <Loader /> : "Reset Password"}
        </button>
      </form>
      <ToastContainer />
    </main>
  )
}

export default ChangePwd
