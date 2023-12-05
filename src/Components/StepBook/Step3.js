
import { useState } from "react";
import { useBooking } from "../../ProviderContext/BookingContext";


function Step3(props) {
  const {bookingInfo}  = useBooking();
  
    // Xử lý sự kiện khi người dùng thay đổi địa điểm và số lượng khách
  
    return (
      <div>
         <h2>Bước 3: Thông tin đã chọn từ Step 1</h2>
      <p>Check-in date: {bookingInfo.checkInDate}</p>
      <p>Check-out date: {bookingInfo.checkOutDate}</p>
      <p>Number of guests: {bookingInfo.numberOfGuests}</p>
      <p>City: {bookingInfo.city}</p>
      </div>
    );
  }
  
  export default Step3;

  
  
  