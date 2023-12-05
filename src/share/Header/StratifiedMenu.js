import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import styles from "./StratifiedMenu.module.css";
import {
  FaUser,
  FaSearch,
  FaPen,
  FaChevronDown,
  FaChevronUp,
  FaBell,
} from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";




const StratifiedMenu = ({ isActive, closeNav }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSubMenuItemClick = () => {
    setIsOpen(false); // Đóng sub-menu
    if (isActive) {
      closeNav(); // Đóng nav nếu ở trạng thái active
    }
  };
  return (
    <li className={styles.liMenu}>
      <Link to="#" onClick={handleToggle} className={styles.straMNLink}>
        More
      </Link>

      <ul
        className={styles.ulSubMenu}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
          <Link to="/profile">
            Profile
          </Link>
        </li>
        <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
        <Link to={"/yourBooking"}>
                YourBooking
              </Link>
        </li>
        <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
        <Link to={"/createPost"}>
                CreatePost
              </Link>
        </li>
        <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
        <Link to={"/"}>
                <FaBell />
              </Link>
        </li>
      </ul>
    </li>
  );
};
export default StratifiedMenu;
