import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
import {
  useDeleteReviewMutation,
  useEditReviewMutation,
} from "./reviewsApiSlice"
import { Icon } from "@iconify/react"
import Modal from "react-bootstrap/Modal"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"

const SingleReview = ({ review, productId }) => {
  const [show, setShow] = useState(false)
  const [editInput, setEditInput] = useState("")
  const time = formatDistanceToNowStrict(new Date(review.updatedAt))
  const { user, isAdmin } = useAuth()
  const [deleteReview] = useDeleteReviewMutation()
  const [editReview] = useEditReviewMutation()
  const startEditing = () => {
    setShow(true)
    setEditInput(review.content)
  }
  const handleClose = () => {
    setShow(false)
  }

  const handleUpdate = async () => {
    await editReview({
      productId,
      reviewId: review._id,
      content: editInput,
    })
    setEditInput("")
    setShow(false)
  }

  const handleDelete = async () => {
    await deleteReview({ reviewId: review._id, productId })
  }
  return (
    <div className='review'>
      <div className='review-top'>
        <img
          src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
          className='review-img'
          alt='profile'
        />
        <p className='review-sender'>
          {review.sender.name.length > 10
            ? review.sender.name.split(" ")[0] || review.sender.name.slice(0, 7)
            : review.sender.name}
        </p>
        <p className='review-date'>{time + " ago"}</p>
        {user === review.sender || isAdmin === true ? (
          <>
            <button
              className='review-menu-btn'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <Icon
                icon='mdi:dots-vertical'
                color='black'
                width='20'
                inline={true}
              />
            </button>
            <ul className='dropdown-menu review-dropdown'>
              <li>
                <button className='dropdown-item' onClick={startEditing}>
                  <span>
                    <Icon
                      icon='material-symbols:edit'
                      color='black'
                      width='20'
                      inline={true}
                    />
                  </span>
                  <span>Edit</span>
                </button>
              </li>
              <li>
                <button className='dropdown-item' onClick={handleDelete}>
                  <span>
                    <Icon
                      icon='ic:baseline-delete'
                      color='black'
                      width='20'
                      inline={true}
                    />
                  </span>
                  <span> Delete</span>
                </button>
              </li>
            </ul>
          </>
        ) : null}
      </div>
      <p className='review-content'>{review.content}</p>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className='reviews-modal-input'
            type='text'
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className='reviews-modal-btn'>
            Close
          </button>
          <button onClick={handleUpdate} className='reviews-modal-btn'>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SingleReview
