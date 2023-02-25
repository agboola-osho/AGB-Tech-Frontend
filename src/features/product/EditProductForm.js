import { useState, useRef } from "react"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import { useUpdateProductMutation } from "./productApiSlice"
import { v4 } from "uuid"
import { Modal } from "react-bootstrap"
import { storage } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const EditProductForm = ({ product }) => {
  const initialValues = {
    category: product.category,
    description: product.description,
    title: product.title,
    brand: product.brand,
    price: product.price,
    discount: product.discount,
    id: product._id,
  }
  const [values, setValues] = useState(initialValues)
  const [show, setShow] = useState(true)
  const filesRef = useRef()
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const navigate = useNavigate()

  const uploadImages = async () => {
    const images = filesRef.current.files
    const promises = []

    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `images/${images[i].name + v4()}`)
      const snapshot = await uploadBytes(imageRef, images[i])
      const url = await getDownloadURL(snapshot.ref)
      promises.push(url)
    }

    const urls = await Promise.all(promises)
    return urls
  }

  const deleteExistingImages = async () => {
    product.images.forEach(async (image) => {
      const imageRef = ref(storage, image)
      await deleteObject(imageRef)
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      values.title === "" ||
      values.description === "" ||
      values.brand === "" ||
      values.category === "" ||
      values.price === "" ||
      values.discount === ""
    ) {
      return
    }
    try {
      const images = await uploadImages()
      if(images?.length) await deleteExistingImages()
      await updateProduct({ ...values, images })
      navigate("/")
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
  let loader = (
    <span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></span>
  )
  return (
    <main className='product-form-page'>
      <article className='product-form-container'>
        <h1 className='form-header'>EDIT PRODUCT</h1>
        <form className='product-form' onSubmit={handleSubmit}>
          <div className='product-inputs'>
            <div className='product-properties'>
              <label htmlFor='image'>Images</label>
              <input
                type='file'
                className='image-input'
                name='images'
                id='images'
                multiple
                accept='image/*'
                ref={filesRef}
              />
            </div>
            <div className=' product-properties'>
              <label htmlFor='title'>Title</label>
              <input
                required
                type='text'
                className='text-input'
                name='title'
                id='title'
                placeholder='iPhone 14'
                value={values.title}
                onChange={handleInputChange}
              />
            </div>
            <div className=' product-properties'>
              <label htmlFor='brand'>Category</label>
              <input
                required
                type='text'
                className='text-input'
                name='category'
                id='category'
                placeholder='Phones'
                value={values.category}
                onChange={handleInputChange}
              />
            </div>
            <div className=' product-properties'>
              <label htmlFor='brand'>Brand</label>
              <input
                required
                type='text'
                className='text-input'
                name='brand'
                id='brand'
                placeholder='Apple'
                value={values.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className=' product-properties'>
              <label htmlFor='price'>Price</label>
              <input
                required
                type='number'
                className='text-input'
                name='price'
                id='price'
                placeholder='14'
                value={values.price}
                onChange={handleInputChange}
              />
            </div>
            <div className=' product-properties'>
              <label htmlFor='discount'>Discount</label>
              <input
                required
                type='number'
                className='text-input'
                name='discount'
                id='discount'
                placeholder='10'
                value={values.discount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className=' product-text-area'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='text-area'
              required
              name='description'
              id='description'
              placeholder='The best iPhone yet'
              value={values.description}
              onChange={handleInputChange}
            />
          </div>
          <button className='product-form-btn'>
            {isLoading ? loader : "Update Product"}
          </button>
        </form>
      </article>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Adding images to the input field deletes all existing images attatched
          to this product
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)} className='product-form-btn'>
            Got it!
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </main>
  )
}

export default EditProductForm
