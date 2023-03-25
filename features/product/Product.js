import { Link, useNavigate, useParams } from "react-router-dom"
import Missing from "../../components/Missing"
import Spinner from "../../components/Spinner"
import Carousel from "react-bootstrap/Carousel"
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "./productApiSlice"
import { Icon } from "@iconify/react"
import { useAddToCartMutation } from "../cart/cartApiSlice"
import useAuth from "../../hooks/useAuth"
import { storage } from "../../config/firebase"
import { ref, deleteObject } from "firebase/storage"
import Reviews from "../reviews/Reviews"
import { ToastContainer, toast } from "react-toastify"
import AddReviews from "../reviews/AddReview"

const Product = () => {
  const { isAdmin, isGuest } = useAuth()
  const { id } = useParams()
  const { product, isLoading, error, isError, isFetching } =
    useGetProductsQuery(undefined, {
      selectFromResult: ({ data }) => ({
        product: data?.find((product) => product._id === id),
      }),
    })
  const [deleteProductById] = useDeleteProductMutation()
  const [addToCart] = useAddToCartMutation()
  const navigate = useNavigate()
  const deleteExistingImages = async () => {
    product.images.forEach(async (image) => {
      const imageRef = ref(storage, image)
      await deleteObject(imageRef)
    })
  }
  const deleteProduct = async () => {
    await deleteExistingImages()
    await deleteProductById(id)
    navigate("/")
  }
  const addItem = async () => {
    const response = await addToCart({
      quantity: 1,
      product: product._id,
    })
    toast.success(response?.data?.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    })
  }
  let privateBtns
  if (isAdmin) {
    privateBtns = (
      <>
        <button className='product-btn'>
          <Link to={`/admin/editProduct/${id}`} className='white-link'>
            Edit Product
          </Link>
        </button>
        <button className='product-btn' onClick={deleteProduct}>
          Delete Product
        </button>
      </>
    )
  }
  let content
  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error.data.message}</p>
  } else if (product) {
    content = (
      <main className='product-page'>
        <section className='product'>
          <Carousel className='product-img'>
            {product.images.map((image) => (
              <Carousel.Item
                className='product-carousel'
                key={product.images.indexOf(image)}
              >
                <img
                  src={image}
                  alt={product.title}
                  className='product-image'
                  key={product.images.indexOf(image)}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className='product-text'>
            <p className='product-category'>{product.category.toUpperCase()}</p>
            <p className='product-name'>{product.title}</p>
            <p className='product-rating'>
              <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
              <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
              <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
              <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
              <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
            </p>
            <p className='product-price'>${product.price}</p>
            <p className='product-description'>{product.description}</p>
            <div className='product-btns'>
              <button className='product-btn' onClick={addItem}>
                Add to cart
              </button>
              {privateBtns}
            </div>
          </div>
        </section>
        <hr />
        <section className='reviews-section'>
          <h1 className='reviews-header'>Reviews</h1>
          {isGuest ? null : <AddReviews productId={id} />}

          <Reviews productId={id} />
        </section>
        <ToastContainer />
      </main>
    )
  } else if (!product) {
    content = <Missing />
  }
  return content
}
export default Product
