// BookingContext.js
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    city: "",
  });

  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
};
