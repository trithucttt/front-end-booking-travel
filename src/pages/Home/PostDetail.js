import { useEffect, useState } from "react";
import styles from "./PostDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Rating from "./Rating";
import Nav from "../../share/Header/Nav";
import YourBooking from "../../SlideBar/YourBooking";
import { set } from "react-hook-form";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import CommentSection from "./CommentSection ";
function PostDetail() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [post, setPost] = useState([]);
  const [isShowCart, setShowCart] = useState(false);
  const [address, setAddress] = useState("");
  const [service, setService] = useState(true);
  const [valueService, setValueService] = useState("Xe đưa đón");

  const token = localStorage.getItem("token");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const [largeImage, setLargeImage] = useState(
    `http://localhost:8086/api/upload/imagePost/${postId}`
  );
  const changeImage = (newImage) => {
    setLargeImage(newImage);
  };
  const [checkInDate, setCheckInDate] = useState(getTodayDate());
  const [checkOutDate, setCheckOutDate] = useState(getTodayDate());
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/api/posts/${postId}`
        );
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Get post by ID failed", error);
      }
    };

    fetchPostById();
  }, [postId]);

  const handleService = (e) => {
    if (e.target.value === "Xe đưa đón") {
      setService(false);
      setValueService(e.target.value);
    }
    if (e.target.value === "Xe cá nhân") {
      setService(true);
      setValueService(e.target.value);
    }
  };

  const handleCheckIn = (e) => {
    const selectedDate = new Date(e.target.value);
    if (isValidDate(selectedDate)) {
      setCheckInDate(selectedDate.toISOString().split("T")[0]);
      // setCheckInDate(selectedDate);
      console.log(checkInDate);
      console.log(typeof checkInDate);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ngày đến không hợp lệ",
      });
    }
  };

  const handleCheckOut = (e) => {
    const selectedDate = new Date(e.target.value);
    if (isValidDate(selectedDate) && selectedDate >= new Date(checkInDate)) {
      setCheckOutDate(selectedDate.toISOString().split("T")[0]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Ngày kết thúc không hợp lệ",
      });
    }
  };
  const isValidDate = (date) => {
    const today = new Date();
    return date instanceof Date && !isNaN(date) && date >= today;
  };

  // console.log(valueService);
  const addToCart = async () => {
    if (token === " " || token === null || token === undefined) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Hãy đăng nhập trước khi đặt Tour",
      });
      navigate("/login");
    } else {
      const decodetoken = jwtDecode(token);
      const usernameToken = decodetoken.sub;
      const newItem = {
        tourId: post.tourId,
        check_in_date: checkInDate,
        username: usernameToken,
        productName: post.name,
        day_tour: post.dayTour,
        priceTour: post.price,
        location: post.city.name,
        service_tour: valueService,
        quantity: parseInt(quantity, 10),
        address: address,
        image_Cart: post.imageString,
      };
      setShowCart(true);
      setCart([...cart, newItem]);
      console.log(newItem);
      // navigate("/yourbooking");
      try {
        const response = await axios.post(
          "http://localhost:8086/api/cart/add",
          newItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        // alert("AddToCart successfully");
        toast.success("AddToCart successfully");
      } catch (error) {
        alert("tạo giỏ hàng mới thành công vui long bấm thêm giỏ hàng lần nữa");
       // alert("AddToCart failed:");
      }
    }
  };

  const payNow = () => {
    navigate("/step3");
  };

  return (
    <div className={styles.container}>
      {/* <Nav soluong={cart.length} setShowCart={setShowCart} /> */}
      <div className={styles.PostDetail}>
        <form className={styles.formDetail}>
        <ul className={styles.imgcard}>
            <li className={styles.img}>
              <img 
                src={largeImage}
                alt=""
                onClick={() =>
                  changeImage(
                    `http://localhost:8086/api/upload/imagePost/${postId}`
                  )
                }
              />
            </li>
            <ul className={styles.imgoptions}>
              <li>
                <img
                  src={`http://localhost:8086/api/upload/imagePost/${postId}`}
                  alt=""
                  onClick={() =>
                    changeImage(
                      `http://localhost:8086/api/upload/imagePost/${postId}`
                    )
                  }
                />
              </li>
              <li>
                <img
                  src={`http://localhost:8086/api/upload/imagePost/${postId}`}
                  alt=""
                  onClick={() =>
                    changeImage(
                      `http://localhost:8086/api/upload/imagePost/${postId}`
                    )
                  }
                />
              </li>
              <li>
                <img
                  src={`http://localhost:8086/api/upload/imagePost/${postId}`}
                  alt=""
                  onClick={() =>
                    changeImage(
                      `http://localhost:8086/api/upload/imagePost/${postId}`
                    )
                  }
                />
              </li>
              <li>
                <img
                  src={`http://localhost:8086/api/upload/imagePost/${postId}`}
                  alt=""
                  onClick={() =>
                    changeImage(
                      `http://localhost:8086/api/upload/imagePost/${postId}`
                    )
                  }
                />
              </li>
            </ul>
          </ul>
          {/* <img
            className={styles.detailHeader}
            alt="post"
            src={`http://localhost:8086/api/upload/imagePost/${postId}`}
          /> */}
          {console.log(postId)}
          <ul className={styles.detailBody}>
            <li className={styles.detailBodyItem}>
              <h2 className={styles.title}>{post.name}</h2>
            </li>
            <li className={styles.detailBodyItem}>
              Tour: {post.dayTour}, {post.location}
            </li>
            {/* <span>Nhà cung cấp: {post.username}</span> */}

            <li className={styles.detailBodyItem}>
              <Rating />
            </li>
            <li className={`${styles.detailBodyItem} ${styles.dateSelect}`}>
              <article className={styles.inDate}>
                <label>Ngày khởi hành</label>
                <input
                  type="date"
                  onChange={handleCheckIn}
                  value={checkInDate}
                  min={getTodayDate()}
                />
              </article>
              {/* <article className={styles.outDate}>
                <label>Ngày kết thúc</label>
                <input
                  type="date"
                  onChange={handleCheckOut}
                  value={checkOutDate}
                  min={checkInDate}
                />
              </article> */}
            </li>
            <li className={styles.detailBodyItem}>
              <label>Dịch vụ: </label>
              <select onChange={handleService}>
                {/* <option value="">Chọn dịch vụ</option> */}
                <option value="Xe đưa đón">Xe đưa đón</option>
                <option value="Xe cá nhân">Xe cá nhân</option>
              </select>
            </li>
            <li className={styles.detailBodyItem}>
              <article>Giá mỗi khách {post.price}₫</article>
            </li>
            <li className={`${styles.detailBodyItem} ${styles.item3}`}>
              <article className={styles.articleQuantity}>
                <label>Số lượng Khách</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </article>
              <article className={styles.articleButton}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={addToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                {/* <button type="button" onClick={payNow}>
            thanh toán ngay
          </button> */}
              </article>
            </li>
          </ul>
        </form>
        <p className={styles.content}>{post.content}</p>
        <div className={styles.detailContent}>
          <span><CommentSection/></span>
        </div>
    
      </div>
      <ToastContainer />
    </div>
  );
}
export default PostDetail;

