import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import Checkout from './Checkout';
import ReviewCart from './ReviewCart';
import Payment from './Payment';

function MultiStepCheckout() {

  const [step, setStep] = useState(1);

  const steps = [
    { component: <Checkout />, label: 'Review' },
    { component: <ReviewCart />, label: 'Review' },
    { component: <Payment />, label: 'Payment' },
  ];

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onPrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <MultiStep steps={steps} activeStep={step} onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
}

export default MultiStepCheckout;
