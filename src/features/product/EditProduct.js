import { useGetProductsQuery } from "./productApiSlice"
import EditProductForm from "./EditProductForm"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"

const EditProduct = () => {
  const { id } = useParams()
  const { product, isLoading, error, isError, isFetching } =
    useGetProductsQuery(undefined, {
      selectFromResult: ({ data }) => ({
        product: data?.find((product) => product._id === id),
      }),
    })

  let content
  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (product) {
    content = <EditProductForm product={product} />
  } else if (isError) {
    content = <p className='error'>{error.data.message}</p>
  }
  return content
}

export default EditProduct
