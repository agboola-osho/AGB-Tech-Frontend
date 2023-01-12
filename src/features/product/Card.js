import { memo } from "react"
import { Link } from "react-router-dom"

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
          <p className='deal-rating'>⭐⭐⭐⭐⭐</p>
        </Link>
        <p className='deal-foot'>
          <span className='deal-price'>{product.price}</span>
        </p>
      </article>
    </>
  )
}
const memoizedCard = memo(Card)

export default memoizedCard
