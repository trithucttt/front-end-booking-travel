import {
  FaUser,
  FaSearch,
  FaPen,
  FaChevronDown,
  FaChevronUp,
  FaBell,
} from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import styles from "./SideBar.module.css";
import { IoCreateSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideBar({ children }) {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <>
      <div className={styles.sideBar}>
        <ul
          className={showSideBar ? styles.listItem : styles.hiddenListItemBar}
        >
          <li className={styles.sideItem}>
            <div className={styles.wrapper}>
              <Link to={"/profile"}>
                <FaUser />
              </Link>
              <div className={styles.tooltip}>Profile</div>
            </div>
          </li>
          <li className={styles.sideItem}>
            <div className={styles.wrapper}>
              <Link to={"/yourBooking"}>
                <MdCardTravel />
              </Link>
              <div className={styles.tooltip}>Your Booking</div>
            </div>
          </li>
          <li className={styles.sideItem}>
            <div className={styles.wrapper}>
              <Link to={"/createPost"}>
                <IoCreateSharp />
              </Link>
              <div className={styles.tooltip}>Create post</div>
            </div>
          </li>
          <li className={styles.sideItem}>
            <div className={styles.wrapper}>
              <Link to={"/"}>
                <FaBell />
              </Link>
              <div className={styles.tooltip}>Notify</div>
            </div>
          </li>
          <li className={styles.sideItem}>
            <div className={styles.wrapper}>
              <FaPen />
              <div className={styles.tooltip}>option5</div>
            </div>
            <ul className={styles.subMenu}>
              <li>
                <Link to="/setting/option1">Option 1</Link>
              </li>
              <li>
                <Link to="/setting/option2">Option 2</Link>
              </li>
              {/* Thêm các option khác */}
            </ul>
          </li>
          
        </ul>
      </div>

    </>
  );
}

export default SideBar;
