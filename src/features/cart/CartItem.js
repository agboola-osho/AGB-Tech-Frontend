import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import useWindowSize from "../../hooks/useWindowSize"
import { useEditQtyMutation, useDeleteFromCartMutation } from "./cartApiSlice"
import { useState } from "react"

const CartItem = ({ item }) => {
  const [deleteFromCart] = useDeleteFromCartMutation()
  const [editQty] = useEditQtyMutation()
  const [quantity, setQuantity] = useState(item.quantity)
  const [updateBtnVisible, setUpdateBtnVisible] = useState(false)
  const { width } = useWindowSize()
  const updateQty = async (e) => {
    e.preventDefault()
    console.log("updating")
    await editQty({
      id: item._id,
      newQty: Number(quantity),
    })
    setUpdateBtnVisible(false)
  }
  return (
    <li className='cart-item'>
      <button
        className='delete-btn'
        onClick={() => deleteFromCart({ id: item._id })}
      >
        <Icon icon='ic:baseline-delete' color='grey' inline={true} />
      </button>
      <Link to={`/product/${item.product._id}`} className='cart-link'>
        <div className='cart-img'>
          <img src={item.product.images[0]} alt={item.product.title} />
        </div>

        <div className='cart-text'>
          <p className='cart-title'>
            {width < 768
              ? `${item.product.title.slice(0, 10)}..`
              : width < 992
              ? `${item.product.title.slice(0, 15)}...`
              : width < 576
              ? `${item.product.title.slice(0, 5)}...`
              : item.product.title}
          </p>
          <p className='cart-price'>${item.product.price}</p>
        </div>
      </Link>
      <form className='cart-qty-form' onSubmit={updateQty} id='qty-form'>
        <input
          type='number'
          maxLength='3'
          value={quantity}
          name='quantity'
          id='quantity'
          onChange={(e) => setQuantity(e.target.value)}
          onFocus={() => setUpdateBtnVisible(true)}
        />
        {updateBtnVisible && (
          <button
            className='cart-qty-update'
            type='submit'
            form='qty-form'
            onClick={() => console.log("some")}
          >
            Update
          </button>
        )}
      </form>
    </li>
  )
}

export default CartItem
