import Men from "../../assets/MenSample.jpg"
import Women from "../../assets/WomenSample.jpg"
import Jewelry from "../../assets/Jewelry.jpg"
import { Link } from "react-router-dom"

const Carousel = () => {
  return (
    <div id='Carousel' className='carousel slide' data-bs-ride='false'>
      <div className='carousel-indicators'>
        <button
          type='button'
          data-bs-target='#Carousel'
          data-bs-slide-to='0'
          className='active'
          aria-current='true'
          aria-label='Slide 1'
        ></button>
        <button
          type='button'
          data-bs-target='#Carousel'
          data-bs-slide-to='1'
          aria-label='Slide 2'
        ></button>
        <button
          type='button'
          data-bs-target='#Carousel'
          data-bs-slide-to='2'
          aria-label='Slide 3'
        ></button>
      </div>
      <div className='carousel-inner'>
        <div className='carousel-item home-carousel-item active'>
          <img src={Men} className='d-block' alt='Men' />
          <div className='carousel-caption home-carousel-caption d-block'>
            <h5>50% Off Your First Purchase</h5>
            <div className='slider-btn'>
              <button className='btn btn-danger'>
                <Link className='link' to="Categories/Men'sClothing">
                  Vist Collection
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className='carousel-item home-carousel-item'>
          <img src={Women} className='d-block' alt='Women' />
          <div className='carousel-caption home-carousel-caption d-block'>
            <h5>50% Off Your First Purchase</h5>
            <div className='slider-btn'>
              <button className='btn btn-danger'>
                <Link className='link' to="Categories/Women'sClothing">
                  Vist Collection
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className='carousel-item home-carousel-item'>
          <img
            src={Jewelry}
            id='jewelry'
            className='d-block'
            alt='Electronics'
          />
          <div className='carousel-caption home-carousel-caption d-block'>
            <h5>50% Off Your First Purchase</h5>
            <div className='slider-btn'>
              <button className='btn btn-danger slider-btn'>
                <Link className='link' to='Categories/Jewelery'>
                  Vist Collection
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className='carousel-control-prev'
        type='button'
        data-bs-target='#Carousel'
        data-bs-slide='prev'
      >
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        type='button'
        data-bs-target='#Carousel'
        data-bs-slide='next'
      >
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  )
}

export default Carousel
