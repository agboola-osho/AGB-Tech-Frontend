import iPad from "../../assets/iPad.jpg"
import iPhone from "../../assets/iPhone.png"
import { Link } from "react-router-dom"
import Carousel from "react-bootstrap/Carousel"

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item className='home-carousel-item'>
        <img src={iPad} className='d-block' id='iPad' alt='iPad' />
        <Carousel.Caption className='home-carousel-caption d-block'>
          <h5>50% Off Your First Purchase</h5>
          <div className='slider-btn'>
            <button className='btn btn-danger'>
              <Link className='link' to='Categories/Tablets'>
                Vist Collection
              </Link>
            </button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='home-carousel-item'>
        <img src={iPhone} className='d-block' id='iPhone' alt='iPhone' />
        <Carousel.Caption className='home-carousel-caption d-block'>
          <h5>50% Off Your First Purchase</h5>
          <div className='slider-btn'>
            <button className='btn btn-danger'>
              <Link className='link' to='Categories/Phones'>
                Vist Collection
              </Link>
            </button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slider
