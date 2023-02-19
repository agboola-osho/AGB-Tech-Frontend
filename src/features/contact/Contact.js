import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContactMutation } from "./contactApiSlice"
import { ToastContainer, toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import Loader from "../../components/Loader"

const Contact = () => {
  const initalValues = {
    name: "",
    email: "",
    message: "",
  }
  const [values, setValues] = useState(initalValues)
  const [show, setShow] = useState(false)
  const [contact, { isLoading }] = useContactMutation()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await contact(values).unwrap()
      setShow(true)
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

  const done = () => {
    setShow(true)
    setValues(initalValues)
    navigate("/")
  }
  return (
    <main className='contact-container'>
      <article className='contact-form-container'>
        <form className='contact-form' onSubmit={handleSubmit}>
          <h1>Contact Us</h1>
          <div className='contact-input'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className='contact-input'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className='contact-textarea'>
            <label htmlFor='message'>Message</label>
            <textarea
              name='message'
              id='message'
              value={values.message}
              onChange={handleChange}
            />
          </div>
          <button className='contact-submit'>
            {isLoading ? <Loader /> : "Submit"}
          </button>
        </form>
      </article>
      <Modal show={show} onHide={done}>
        <Modal.Header closeButton>
          <Modal.Title>Message Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hi {values.name},<br />
          Your message has been sent to the members of the AGB Tech team and you
          will receive a response to your email {values.email}
        </Modal.Body>
        <Modal.Footer>
          <button className='contact-submit' onClick={done}>
            Got it
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </main>
  )
}

export default Contact
