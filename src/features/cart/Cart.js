import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import { useGetCartQuery, useDeleteFromCartMutation } from "./cartApiSlice"
import useWindowSize from "../../hooks/useWindowSize"
import { useEditQtyMutation } from "./cartApiSlice"
import Spinner from "../../components/Spinner"
import { useRef } from "react"

const Cart = () => {
  const {
    data: cart,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetCartQuery()
  const [deleteFromCart] = useDeleteFromCartMutation()
  const [editQty] = useEditQtyMutation()
  const { width } = useWindowSize()
  const qtyRef = useRef()
  const updateQty = (e, id, qty) => {
    e.preventDefault()
    editQty({
      id,
      newQty: Number(qty),
    })
    console.log(qtyRef.current.value)
  }

  let cartContent

  if (isLoading || isFetching) {
    cartContent = <Spinner />
  } else if (isError) {
    cartContent = <p className='error'>{error.data.message}</p>
  }
  if (cart) {
    cartContent = (
      <main className='cart'>
        <ul className='cart-items'>
          {cart.map((product) => (
            <li className='cart-item' key={product._id}>
              <button
                className='delete-btn btn-delete'
                onClick={() => deleteFromCart({ id: product._id })}
              >
                <Icon icon='bi:x' inline={true} />
              </button>
              <Link to={`/product/${product.source}`} className='cart-link'>
                <div className='cart-img'>
                  <img src={product.image} alt={product.title} />
                </div>

                <div className='cart-text'>
                  <p className='cart-title'>
                    {width < 768
                      ? `${product.title.slice(0, 10)}..`
                      : width < 992
                      ? `${product.title.slice(0, 15)}...`
                      : width < 576
                      ? `${product.title.slice(0, 5)}...`
                      : product.title}
                  </p>
                  <p className='cart-price'>${product.price}</p>
                </div>
              </Link>
              <form
                onSubmit={(e) => updateQty(e, product._id, product.quantity)}
              >
                <input
                  type=''
                  maxLength='3'
                  defaultValue={product.quantity}
                  name='quantity'
                  id='quantity'
                  onChange={(e) => (product.quantity = e.target.value)}
                />
                <button>Update</button>
              </form>
            </li>
          ))}
        </ul>
      </main>
    )
  }
  return cartContent
}

export default Cart
