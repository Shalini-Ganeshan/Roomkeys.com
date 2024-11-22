import  { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import '../styles/ClientReviews.css'
import pic1 from '../image/pic1.png'
import pic2 from '../image/pic2.png'
import pic3 from '../image/pic3.png'
import pic4 from '../image/pic4.png'
import pic5 from '../image/pic5.png'
import pic6 from '../image/pic6.png'
const ClientReviews = () => {
  useEffect(() => {
    const swiper = new Swiper('.reviews-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },
    });


    return () => swiper.destroy();
  }, []);

  return (
    <section className="reviews" id="reviews">
      <h1 className="heading md:text-3xl font-semibold ">client's <span>review</span></h1>
      <div className="swiper reviews-slider">
        <div className="swiper-wrapper">
        
          <div className="swiper-slide box">
            <img src={pic1} alt="" />
            <div className="content">
            <h3 className='font-semibold'>Jane Smith</h3>
              <p>The service was exceptional and the team was incredibly responsive. I highly recommend them!</p>
           
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div className="swiper-slide box">
            <img src={pic2} alt="" />
            <div className="content">
            <h3 className='font-semibold'>John Doe</h3>
              <p>I was very satisfied with the service and will definitely come back again. Great experience!</p>
          
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div className="swiper-slide box">
            <img src={pic3} alt="" />
            <div className="content">
            <h3 className='font-semibold'>Michael Johnson</h3>
              <p>Everything was perfect from start to finish. I would highly recommend their services!</p>

              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div className="swiper-slide box">
            <img src={pic4} alt="" />
            <div className="content">
            <h3 className='font-semibold'>Emily Davis</h3>
              <p>Amazing experience! The team was professional and the service exceeded my expectations.</p>
          
              <div className="stars">
                <i className="fas fa-star"></i>
              
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div className="swiper-slide box">
            <img src={pic5} alt="" />
            <div className="content">
            <h3 className='font-semibold'> David Brown</h3>
              <p>Great service! I was very happy with the results and the team was very friendly and helpful.</p>
         
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
               
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div className="swiper-slide box">
            <img src={pic6} alt="" />
            <div className="content">
            <h3 className='font-semibold'>James Wilson</h3>
              <p>The best service I have ever experienced. I will definitely recommend them to my friends!</p>
              
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

        </div>
    
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default ClientReviews;
