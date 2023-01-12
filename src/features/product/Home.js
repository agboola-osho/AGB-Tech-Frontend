import React from "react"
import Carousel from "./Carousel"
import Deals from "./Deals"

const Home = () => {
  return (
    <main>
      <Carousel />
      <Deals />
    </main>
  )
}
const memoizedHome = React.memo(Home)
export default memoizedHome
