import { useGetReviewsQuery } from "./reviewsApiSlice"
import SingleReview from "./SingleReview"

const Reviews = ({ productId }) => {
  const { data: reviews, isError, error } = useGetReviewsQuery(productId)

  let content

  if (isError) {
    content = <p className='error'>{error?.data?.message}</p>
  } else if (reviews?.length) {
    const sortedReviews = reviews
      .slice()
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
      .reverse()
    console.log(sortedReviews)
    content = (
      <article className='reviews-container'>
        {sortedReviews.map((review) => (
          <SingleReview
            review={review}
            key={review._id}
            productId={productId}
          />
        ))}
      </article>
    )
  } else {
    content = <p className='error'>No reviews were found</p>
  }
  return content
}

export default Reviews
