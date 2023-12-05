import { useRef, useState } from "react";
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import { NextArrow, PrevArrow } from "./CustomArrow";
import Step1 from "../Components/StepBook/Step1";
import Step2 from "../Components/StepBook/Step2";
import Step3 from "../Components/StepBook/Step3";
// import "slick-carousel/slick/slick-theme.css";
// import {provincesAndCities} from "./CityItems"
function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
     slidesToScroll: 1,
     initialSlide: 0,
     prevArrow: <PrevArrow />, 
     nextArrow: <NextArrow />,
  };
  const handlePrevStep = () => {
    if (currentStep > 0) {
      sliderRef.current.slickPrev();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      sliderRef.current.slickNext();
      setCurrentStep(currentStep + 1);
    }
  };
  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {currentStep === 0 && <Step1 />}
        {currentStep === 1 && <Step2 />}
        {currentStep === 2 && <Step3 />}
      </Slider>
      {/* <div>
        {currentStep > 0 && (
          <button onClick={handlePrevStep}>Bước trước</button>
        )}
        {currentStep < 2 && (
          <button onClick={handleNextStep}>Bước tiếp theo</button>
        )}
      </div> */}

    </div>
  );
}
export default Booking;
