import { selectEmailDetails } from "./authSlice"
import { useSendEmailMutation } from "./authApiSlice"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import Hero from "../../assets/EmailSentHero.png"

const EmailSent = () => {
  const location = useLocation()
  const [sendEmail, { isLoading }] = useSendEmailMutation()
  const emailDetails = useSelector(selectEmailDetails)
  let content
  const resend = async () => {
    try {
      await sendEmail(emailDetails)
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
  const loader = (
    <span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></span>
  )
  if (emailDetails !== null) {
    content = (
      <main className='email-sent'>
        <article className='email-sent-container'>
          <div className='email-sent-hero'>
            <img src={Hero} alt='Hero' />
          </div>
          <h1 className='email-sent-header'>Verify Your Email</h1>
          <p className='email-sent-text'>
            You've entered {emailDetails.email} as the email address for your
            account
          </p>
          <p className='email-sent-text'>
            An email has been sent to your email address to{" "}
            {emailDetails.operation === "verifyEmail"
              ? "verify your identity"
              : "reset your password"}
          </p>
          <p className='email-sent-text'>Didn't receive the email ? :</p>
          <button
            className='email-sent-btn'
            onClick={resend}
            disabled={isLoading}
          >
            {isLoading ? loader : "Resend Email"}
          </button>
        </article>
        <ToastContainer />
      </main>
    )
  } else {
    content = <Navigate to='/' state={{ from: location }} replace />
  }
  return content
}

export default EmailSent
