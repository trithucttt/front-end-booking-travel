import { useState } from "react";
import styles from "../../SlideBar/Booking.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { citi } from "./CityItems";
import { useCity } from "../../ProviderContext/CityProvider";
import { compose } from "redux";
import { useBooking } from "../../ProviderContext/BookingContext";
function Step1() {
  const navigate = useNavigate();
  const { setCity } = useCity();
  const { setBookingInfo } = useBooking();
  const [guestCount, setGuestCount] = useState(1);

  const [bookingInfor, setBookingInfor] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    city: "",
  });

  // Xử lý sự kiện
  const [cities, setCities] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfor({
      ...bookingInfor,
      [name]: value,
    });
  };
  const handleCitySelected = (selectedCity) => {
    setCity(selectedCity);
    console.log(selectedCity);
  };
  const handleNumberOfGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 15) {
      setGuestCount(value);
      setBookingInfor({
        ...bookingInfor,
        numberOfGuests: value, // Cập nhật số lượng khách trong thông tin đặt phòng
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Information travel tour:", bookingInfor);
    setBookingInfo({...bookingInfor});
    navigate("/step2");
  };
  return (
    <div>
      <h1>Touring book</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="checkInDate" className={styles.label}>
            Check-in date:
          </label>
          <input
            className={styles.inputBox}
            type="date"
            name="checkInDate"
            // id="checkInDate"  thêm id format
            value={bookingInfor.checkInDate}
            onChange={handleInputChange}
          />
          {/* <p>Ngày trả  phòng đã chọn: {formatDate(bookingInfor.checkInDate)}</p> */}
          {/*  hiển thị ngày đã format*/}
        </div>
        <div>
          <label className={styles.label}>Check-out date:</label>
          <input
            className={styles.inputBox}
            type="date"
            name="checkOutDate"
            value={bookingInfor.checkOutDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={styles.label}>The number of guests:</label>
          <input
            className={styles.inputBox}
            type="number"
            name="numberOfGuests"
            value={guestCount}
            onChange={handleNumberOfGuestsChange}
          />
        </div>
        <div>
          <label className={styles.label}>Choose City</label>
          <select
            className={styles.inputBox}
            name="city"
            value={bookingInfor.city}
            onChange={(e) => {
              handleInputChange(e);
              handleCitySelected(e.target.value);
            }}
          >
            {/* {cities.map((city) => {
              return <option key={city.id}>{city.name}</option>;
            })} */}
            {citi.map((city, index) => {
              return <option key={index}>{city.cityName}</option>;
            })}
          </select>
        </div>
        <button className={`btn btn-primary ${styles.btn}`} type="submit">
          Book
        </button>
      </form>
    </div>
  );
}
export default Step1;
