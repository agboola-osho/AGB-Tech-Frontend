import { useParams } from "react-router-dom"
import { useGetProductsQuery } from "./productApiSlice"
import Spinner from "../../components/Spinner"
import Missing from "../../components/Missing"
import ResultItem from "./ResultItem"

const Brands = () => {
  const { brand } = useParams()
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetProductsQuery(brand)
  let content

  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error?.data?.message}</p>
  } else if (products?.length) {
    content = (
      <>
        <h6 className='result-header'>{brand.toUpperCase()}</h6>
        <ul className='results'>
          {products.map((item) => (
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
