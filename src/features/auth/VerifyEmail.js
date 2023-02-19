import { useVerifyEmailMutation, useSendEmailMutation } from "./authApiSlice"
import { useEffect, useRef } from "react"
import { useSearchParams, Navigate, useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import Spinner from "../../components/Spinner"
import Hero from "../../assets/EmailSentHero.png"
import jwtDecode from "jwt-decode"

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [verifyToken, { isLoading, isError, isSuccess }] =
    useVerifyEmailMutation()
  const [sendEmail, { isLoading: sending }] = useSendEmailMutation()
  const effectRan = useRef(false)
  const token = searchParams.get("token")
  const { email } = jwtDecode(token)
  const emailDetails = {
    btnContent: "Verify Your Email",
    message1: "You recently created an AGB Tech account",
    message2:
      "Verify your email by clicking this button, the link will expire in 15 minutes so use it as fast as you can",
    title: "Verify Your Email",
    header: "Verify Your Email",
    email,
    operation: "verifyEmail",
  }
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyEmail = async () => {
        try {
          await verifyToken(token).unwrap()
        } catch (err) {
          if (err.data.message === "Token expired") {
            await sendEmail(emailDetails)
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
      verifyEmail()
    }
    return () => (effectRan.current = true)
  }, [])

  const resend = async () => {
    try {
      await sendEmail(emailDetails).unwrap()
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

  let content
  if (!token) content = <Navigate to='/' state={{ from: location }} replace />
  const loader = (
    <span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></span>
  )
  if (isSuccess) {
    content = <Navigate to='/login' state={{ from: location }} replace />
  } else if (isLoading) {
    content = <Spinner />
  } else if (isError) {
    content = (
      <main className='email-sent'>
        <article className='email-sent-container'>
          <div className='email-sent-hero'>
            <img src={Hero} alt='Hero' />
          </div>
          <h1 className='email-sent-header'>Email Verification Failed</h1>
          <p className='email-sent-text'>
            Looks like your verification link has expired, well that's
            disappointing
          </p>
          <p className='email-sent-text'>
            We have sent a new email to your email address {email} with a new
            link
          </p>
          <p className='email-sent-text'>Didn't receive the email ?</p>
          <button
            className='email-sent-btn'
            onClick={resend}
            disabled={sending}
          >
            {sending ? loader : "Resend Email"}
          </button>
        </article>
        <ToastContainer />
      </main>
    )
  }

  return content
}

export default VerifyEmail
