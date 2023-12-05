import React from 'react';

// Component cho nút "Bước trước"
const PrevArrow = (props) => (
  <div className="custom-prev-arrow" onClick={props.onClick}>
    Previous
  </div>
);

// Component cho nút "Bước tiếp theo"
const NextArrow = (props) => (
  <div className="custom-next-arrow" onClick={props.onClick}>
    Next
  </div>
);

export { PrevArrow, NextArrow };
