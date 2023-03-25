import Img from "../assets/404.png"
const Missing = () => {
  return (
    <main className='missing'>
      <img src={Img} alt='404' />
      <h1>No results found</h1>
      <p>The page you were looking for does not exist</p>
    </main>
  )
}

export default Missing
