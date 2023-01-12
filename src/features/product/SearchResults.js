import ResultItem from "./ResultItem"
import Spinner from "../../components/Spinner"
import { useGetProductsQuery } from "./productApiSlice"

const SearchResults = () => {
  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery()
  let content
  if (isLoading) {
    content = <Spinner />
  } else if (searchResults?.length) {
    content = (
      <>
        <h6 className='result-header'>RESULTS</h6>
        <ul className='results'>
          {searchResults.map((product) => (
            <ResultItem key={product._id} product={product} />
          ))}
        </ul>
      </>
    )
  } else if (isError) {
    content = <p className='error'>{error.data.message}</p>
  }
  return content
}

export default SearchResults
