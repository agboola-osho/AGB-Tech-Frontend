import { memo } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"

const Card = ({ product }) => {
  let discount
  if (product.discount === 0) {
    discount = null
  } else if (product.discount !== 0) {
    discount = <p className='discount'>{product.discount}% Off</p>
  }
  return (
    <>
      <article className='deal-item'>
        <Link to={`/product/${product._id}`} className='card-link'>
          {discount}
          <div className='deal-img'>
            <img src={product.images[0]} alt='img' />
          </div>
          <p className='deal-name'>{product.title}</p>
          <p className='deal-rating'>
            <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
            <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
            <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
            <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
            <Icon icon='ic:round-star-rate' color='#FFEE58' width='30' />
          </p>
          <p className='deal-foot'>
            <span className='deal-price'>{product.price}</span>
          </p>
        </Link>
      </article>
    </>
  )
}
const memoizedCard = memo(Card)

export default memoizedCard
