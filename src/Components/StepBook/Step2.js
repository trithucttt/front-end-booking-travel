import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import styles from "../../SlideBar/Booking.module.css";
import { useCity } from "../../ProviderContext/CityProvider";

function Step2() {
  const { city } = useCity();
  console.log(city);
  const navigate = useNavigate();
  const [hotel, sethotel] = useState([]);
  const [bookHotel, setBookHotel] = useState({
    District: "",
    Ward: "",
    Address: "",
    hotelName: "",
    roomNuber: "",
    price: "300k/h",
    typeOfRoom: "",
  });

  // Xử lý sự kiện
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookHotel({
      ...bookHotel,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Information travel tour:", bookHotel);
    navigate("/step3");
  };
  return (
    <div>
      <h1> Hotel in {city}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="checkInDate" className={styles.label}>
            District:
          </label>
          <select
            className={styles.inputBox}
            name="District"
            value={bookHotel.District}
            onChange={handleInputChange}
          >
            {/* {hotel.map((city) => {
              return <option key={city.id}>{city.name}</option>;
            })} */}
            <option>Ninh Kieu</option>
            <option>Cai Rang</option>
            <option>Binh Thuy</option>
            <option>Phong Dien</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Ward:</label>
          <select
            className={styles.inputBox}
            name="Ward"
            value={bookHotel.Ward}
            onChange={handleInputChange}
          >
            <option>Cai Khe</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Address:</label>
          <select
            className={styles.inputBox}
            name="Address"
            value={bookHotel.Address}
            onChange={handleInputChange}
          >
            <option>Cai Khe</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Hotel Name</label>
          <select
            className={styles.inputBox}
            name="hotelName"
            value={bookHotel.hotelName}
            onChange={handleInputChange}
          >
            <option key={city.id}>hotelName</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>roomNuber</label>
          <select
            className={styles.inputBox}
            name="roomNuber"
            value={bookHotel.roomNuber}
            onChange={handleInputChange}
          >
            <option key={city.id}>roomNuber</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>typeOfRoom</label>
          <select
            className={styles.inputBox}
            name="typeOfRoom"
            value={bookHotel.typeOfRoom}
            onChange={handleInputChange}
          >
            <option key={city.id}>typeOfRoom</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>price</label>
          <input
            className={styles.inputBox}
            name="price"
            value={bookHotel.price}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <button className={`btn btn-primary ${styles.btn}`} type="submit">
          Check
        </button>
      </form>
    </div>
  );
}

export default Step2;
