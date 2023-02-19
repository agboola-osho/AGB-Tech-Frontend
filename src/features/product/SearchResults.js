import ResultItem from "./ResultItem"
import Spinner from "../../components/Spinner"
import { useSearchProductsQuery } from "./productApiSlice"
import { useSearchParams } from "react-router-dom"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const {
    data: searchResults,
    isLoading,
    isError,
    isFetching,
    error,
  } = useSearchProductsQuery(query)
  let content
  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error.data.message}</p>
  } else if (searchResults?.length) {
    console.log(searchResults)
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
  }
  return content
}

export default SearchResults
