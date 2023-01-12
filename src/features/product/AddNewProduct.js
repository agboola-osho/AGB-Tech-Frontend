import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState, useRef } from "react"
import { storage } from "../../config/firebase"
import { v4 } from "uuid"
import { useCreateNewProductMutation } from "./productApiSlice"
import { useNavigate } from "react-router-dom"

const AddNewProduct = () => {
  const [title, setTitle] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [description, setDescription] = useState("")

  const filesRef = useRef()

  const [createNewProduct, { isLoading }] = useCreateNewProductMutation()
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
      console.log(imageUrls)
    }
  }

  let loader
  if (isLoading) {
    loader = (
      <span
        className='spinner-border spinner-border-sm'
        role='status'
        aria-hidden='true'
      ></span>
    )
  }

  const handleSubmit = async (e) => {
    if (
      title === "" ||
      description === "" ||
      brand === "" ||
      category === "" ||
      price === "" ||
      discount === "" ||
      imageUrls === []
    ) {
      return
    }

    e.preventDefault()
    await uploadImages()
    await createNewProduct({
      title,
      description,
      brand,
      category,
      price: Number(price),
      discount: Number(discount),
      images: imageUrls,
    })

    setBrand("")
    setTitle("")
    setDescription("")
    setCategory("")
    setPrice("")
    setDiscount("")
    setCategory("")
    navigate("/")
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
          <button className='product-form-btn'>{loader} Add Product</button>
        </form>
      </article>
    </main>
  )
}

export default AddNewProduct
