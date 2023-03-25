import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState, useRef } from "react"
import { storage } from "../../config/firebase"
import { v4 } from "uuid"
import { useCreateNewProductMutation } from "./productApiSlice"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const AddNewProduct = () => {
  const initialValues = {
    category: "",
    description: "",
    title: "",
    images: [],
    brand: "",
    price: "",
    discount: "",
  }

  const filesRef = useRef()
  const [values, setValues] = useState(initialValues)
  const [createNewProduct, { isLoading }] = useCreateNewProductMutation()
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

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }
  let loader = (
    <span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></span>
  )

  const handleSubmit = async (e) => {
    if (values === initialValues) {
      return
    }

    e.preventDefault()
    try {
      const images = await uploadImages()
      await createNewProduct({ ...values, images })
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
  return (
    <main className='product-form-page'>
      <article className='product-form-container'>
        <h1 className='form-header'>ADD NEW PRODUCT</h1>
        <form className='product-form' onSubmit={handleSubmit}>
          <div className='product-inputs'>
            <div className='product-properties'>
              <label htmlFor='image'>Images</label>
              <input
                required
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
            {isLoading ? loader : "Add Product"}
          </button>
        </form>
      </article>
      <ToastContainer />
    </main>
  )
}

export default AddNewProduct
