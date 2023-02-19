import { useAddReviewMutation } from "./reviewsApiSlice"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"

const AddReviews = ({ productId }) => {
  const [newReview, setNewReview] = useState("")
  const [addReview, { isLoading }] = useAddReviewMutation()
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      addReview({
        content: newReview,
        productId,
      })
      setNewReview("")
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
  const disableSubmit = newReview === ""
  return (
    <div className='add-review'>
      <form className='add-review-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className='add-review-input'
        />
        <button
          type='submit'
          className='add-review-btn'
          disabled={disableSubmit}
        >
          {isLoading ? loader : "Add"}
        </button>
      </form>
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
    </div>
  )
}

export default AddReviews
