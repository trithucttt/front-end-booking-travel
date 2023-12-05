import React from 'react';

function ReviewCart(props){
  const data = props.sendData;
  return(
    <div>
    <h2>Review Cart</h2>
    <ul>
      <li>Total Price: {props.sendData}₫</li>
      {console.log({data})}
      {/* <li>Checked Items: {checkPrice.filter((isChecked) => isChecked).length}</li> */}
    </ul>
    
  </div>
  )
};

export default ReviewCart;