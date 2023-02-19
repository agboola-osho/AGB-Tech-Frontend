import Logo from "../../assets/Logo.png"
import { useState, useRef, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { setEmailDetails } from "./authSlice"
import { Link, useNavigate } from "react-router-dom"
import { useSendEmailMutation } from "./authApiSlice"

const ResetPwd = () => {
  const [email, setEmail] = useState("")
  const inputRef = useRef()
  const [sendEmail, { isLoading }] = useSendEmailMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  const loader = (
    <span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></span>
  )
  const emailDetails = {
    btnContent: "Reset Your Password",
    message1:
      "You recently requested a password change for your AGB Tech account. The link expires in 15 minutes, so do it as soon as possible",
    message2: "To reset your password click here:",
    title: "Verify Your Email",
    header: "Verify Your Email",
    email,
    operation: "changePwd",
  }
  const allowSubmit = email === ""
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setEmailDetails(emailDetails))
    try {
      await sendEmail(emailDetails).unwrap()
      navigate("/emailSent")
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
        <h2>Reset Password</h2>
        <div className='input-container'>
          <label htmlFor='email'>Enter Your Email Address</label>
          <input
            type='email'
            className='auth-input border-danger'
            id='email'
            value={email}
            ref={inputRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className='form-submit' disabled={allowSubmit}>
          {isLoading ? loader : "Reset Password"}
        </button>
      </form>
      <Link to='/login'>Back to login</Link>
      <ToastContainer />
    </main>
  )
}

export default ResetPwd
