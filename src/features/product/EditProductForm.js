import { useState, useRef, useEffect } from "react"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import { toast, ToastContainer } from "react-toastify"
import { useUpdateProductMutation } from "./productApiSlice"
import { v4 } from "uuid"
import { storage } from "../../config/firebase"
import { useNavigate } from "react-router-dom"

const EditProductForm = ({ product }) => {
  const [title, setTitle] = useState(product.title)
  const [category, setCategory] = useState(product.category)
  const [brand, setBrand] = useState(product.brand)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)
  const [discount, setDiscount] = useState(product.discount)
  const filesRef = useRef()
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const navigate = useNavigate()
  const imageUrls = []
  const uploadImages = async () => {
    const images = filesRef.current.files
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `images/${images[i].name + v4()}`)
      const snapshot = await uploadBytes(imageRef, images[i])
      const url = await getDownloadURL(snapshot.ref)
      console.log(url)
      imageUrls.push(url)
    }
  }
  useEffect(() => {
    toast.info(
      "Adding images to the input field deletes all existing images attatched to this product",
      {
        position: "bottom-right",
        autoClose: 20000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    )
  }, [])

  const deleteExistingImages = async () => {
    product.images.forEach(async (image) => {
      const imageRef = ref(storage, image)
      await deleteObject(imageRef)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      title === "" ||
      description === "" ||
      brand === "" ||
      category === "" ||
      price === "" ||
      discount === ""
    ) {
      return
    }
    if (filesRef.current.files.length) {
      await deleteExistingImages()
      await uploadImages()
      await updateProduct({
        title,
        description,
        brand,
        category,
        price: Number(price),
        discount: Number(discount),
        images: imageUrls,
        id: product._id,
      })
    }
    if (!filesRef.current.files.length) {
      await updateProduct({
        title,
        description,
        brand,
        category,
        price: Number(price),
        discount: Number(discount),
        id: product._id,
      })
    }
    navigate("/")
  }
  let loader

  if (isLoading) {
    ;<span
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></span>
  }
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className='product-form-btn'>{loader} Update Product</button>
        </form>
      </article>
      <ToastContainer
        position='bottom-right'
        autoClose={20000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  )
}

export default EditProductForm
