import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './HeaderSlider.module.css';
import {Images} from '../../Components/Image/Images';
function HeaderSlider() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  
    autoplaySpeed: 3000, 
  };
  return (
    <div className={styles.HeaderSlider}>
      <Slider {...sliderSettings}>
        <div>
          <img className={styles.imageBanner} src={Images[0]} alt=""/>
        </div>
        <div>
        <img className={styles.imageBanner} src={Images[1]} alt=""/>
        </div>
        <div>
        <img  className={styles.imageBanner}src={Images[2]} alt=""/>
        </div>
      </Slider>
    </div>
  );
}
export default HeaderSlider;
