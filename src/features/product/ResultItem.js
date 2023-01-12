import React from "react"
import { Link } from "react-router-dom"

const ResultItem = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product._id}`} className='card-link'>
        <li className='result-item'>
          <div className='result-img'>
            <img src={product.images[0]} alt='img' />
          </div>
          <p className='result-title'>{product.title}</p>
          <p className='result-rating'>⭐⭐⭐⭐⭐</p>
          <p className='result-price'>{product.price}</p>
        </li>
      </Link>
    </>
  )
}

export default ResultItem
