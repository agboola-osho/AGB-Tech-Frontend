import { useGetCartQuery } from "./cartApiSlice"
import Spinner from "../../components/Spinner"
import CartItem from "./CartItem"

const Cart = () => {
  const {
    data: cart,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetCartQuery()

  let cartContent

  if (isLoading || isFetching) {
    cartContent = <Spinner />
  } else if (isError) {
    cartContent = <p className='error'>{error?.data?.message}</p>
  } else if (cart.length) {
    cartContent = (
      <main className='cart'>
        <ul className='cart-items'>
          {cart.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
        </ul>
      </main>
    )
  } else {
    cartContent = <p className='error'>Your cart is empty</p>
  }
  return cartContent
}

export default Cart
