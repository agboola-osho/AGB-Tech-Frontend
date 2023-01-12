import { useParams } from "react-router-dom"
import { useGetProductsByBrandQuery } from "./productApiSlice"
import Spinner from "../../components/Spinner"
import Missing from "../../components/Missing"
import ResultItem from "./ResultItem"

const Brands = () => {
  const { brand } = useParams()
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetProductsByBrandQuery(brand)
  let content

  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error?.data?.message}</p>
  } else if (product?.length) {
    content = (
      <>
        <h6 className='result-header'>{brand.toUpperCase()}</h6>
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

export default Brands
