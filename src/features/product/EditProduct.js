import { useGetProductByIdQuery } from "./productApiSlice"
import EditProductForm from "./EditProductForm"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"

const EditProduct = () => {
  const { id } = useParams()
  const {
    data: product,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetProductByIdQuery(id)

  let content
  if (isLoading || isFetching) {
    content = <Spinner />
  } else if (product && isSuccess) {
    content = <EditProductForm product={product} />
  } else if (isError) {
    content = <p className='error'>{error.data.message}</p>
  }
  return content
}

export default EditProduct
