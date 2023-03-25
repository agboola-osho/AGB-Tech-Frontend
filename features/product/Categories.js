import { useParams } from "react-router-dom"
import { useGetProductsByCategoryQuery } from "./productApiSlice"
import ResultItem from "./ResultItem"
import Spinner from "../../components/Spinner"
import Missing from "../../components/Missing"

const Categories = () => {
  const { category } = useParams()
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetProductsByCategoryQuery(category)
  let content

  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error?.data?.message}</p>
  } else if (product?.length) {
    content = (
      <>
        <h6 className='result-header'>{category.toUpperCase()}</h6>
        <ul className='results'>
          {product.map((item) => (
            <ResultItem key={item._id} product={item} />
          ))}
        </ul>
      </>
    )
  } else {
    content = <Missing />
  }
  return content
}

export default Categories
