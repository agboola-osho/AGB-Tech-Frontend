import Card from "./Card"
import { Icon } from "@iconify/react"
import { useGetProductsQuery } from "../../features/product/productApiSlice"
import Spinner from "../../components/Spinner"

const Deals = () => {
  const { data: products, isLoading, error, isError } = useGetProductsQuery()
  let content
  if (isLoading) {
    content = <Spinner />
  } else if (isError) {
    content = <p className='error'>{error.data.message}</p>
  } else if (products?.length) {
    content = (
      <div className='flash-deals'>
        <h5>
          <Icon icon='akar-icons:thunder' inline={true} id='thunder' /> Flash
          Deals
        </h5>
        <div className='deals'>
          {products.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      </div>
    )
  }
  return content
}

export default Deals
