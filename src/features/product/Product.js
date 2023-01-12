import { Link, useNavigate, useParams } from "react-router-dom"
import Missing from "../../components/Missing"
import Spinner from "../../components/Spinner"
import Carousel from "react-bootstrap/Carousel"
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "./productApiSlice"
import { useAddToCartMutation } from "../cart/cartApiSlice"
import useAuth from "../../hooks/useAuth"
import { storage } from "../../config/firebase"
import { ref, deleteObject } from "firebase/storage"

const Product = () => {
  const { isAdmin } = useAuth()
  const { id } = useParams()
  const {
    data: product,
    isLoading,
    error,
    isError,
    isFetching,
  } = useGetProductByIdQuery(id)
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
  let privateBtns
  if (isAdmin) {
    privateBtns = (
      <>
        <button className='add-cart'>
          <Link to={`/admin/editProduct/${id}`} className='white-link'>
            Edit Product
          </Link>
        </button>
        <button className='add-cart' onClick={deleteProduct}>
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
          <p className='product-rating'>⭐⭐⭐⭐⭐</p>
          <p className='product-price'>${product.price}</p>
          <p className='product-description'>{product.description}</p>
          <div className='product-btn'>
            <button
              className='add-cart'
              onClick={() =>
                addToCart({
                  image: product.images[0],
                  title: product.title,
                  quantity: 1,
                  price: product.price,
                  source: product._id,
                })
              }
            >
              Add to cart
            </button>
            {privateBtns}
          </div>
        </div>
      </main>
    )
  } else if (!product) {
    content = <Missing />
  }
  return content
}
export default Product
