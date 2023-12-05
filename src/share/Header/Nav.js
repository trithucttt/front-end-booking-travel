import styles from "./Nav.module.css";
import { MenuItems } from "./MenuItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userAction,{ logout, selectUser } from "../../reduxProvider/userSlice";

function Nav({soluong}) {
   const { isAuthenticated } = useSelector(selectUser);
  const [menu, setMenu] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout(logout));
    localStorage.setItem("token"," ");
  };

  const handleClick = () => {
    setMenu(!menu);
  };
  //  const handleShowCart = ()=>{
  //   setShowCart(true)
  //  }
  // const handleLogin = () => {
  //   setHdRegis(!hdRegis);
  // };
  // const handleHidden = () => {
  //   setHdRegis(!handleHidden);
  // };
  const closeNav = () => {
    if (isActive === true) {
      setMenu(!menu);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const handleSubMenuItemClick = () => {
    setIsOpen(false); // Đóng sub-menu
    if (isActive) {
      closeNav(); // Đóng nav nếu ở trạng thái active
    }
  };

  return (
    <>
      <nav className={styles.NavItems} onMouseLeave={handleMouseLeave}>
        <h1 className={styles.NavLogo}>
          <Link
            to="https://www.facebook.com/trithuc.nguyen.3344"
            className={styles.navLogoLink}
          >
            TRITHUCz
          </Link>
        </h1>
        {/*  <AiOutlineBars/>*/}
        <div
          className={styles.menuIcon}
          onClick={() => {
            handleClick();
            setIsActive(true);
          }}
        >
          <i
            className={
              menu ? "fa-sharp fa-solid fa-bars" : "fa-sharp fa-solid fa-times"
            }
          ></i>
        </div>
        <ul className={menu ? styles.navMenu : styles.navMenuActive}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className={styles.navLi}>
                <Link
                  to={item.url}
                  className={styles[item.className]}
                  onClick={() => {
                    // handleHidden();
                    closeNav();
                  }}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}

          {isAuthenticated && (
            <li className={styles.navLi}>
              <Link 
              to={"/login"}
              className={styles.navLinks}
                onClick={() => {
                  // handleLogin();
                  closeNav();
                 handleLogout();
                }}
              >
                Logout
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className={styles.navLi}>
              <Link
                onClick={() => {
                  // handleLogin();
                  closeNav();
                }}
                to={"/login"}
                className={styles.navLinks}
              >
                Log In
              </Link>
            </li>
          )}

          <li className={styles.navLi}>
            <Link
              className={styles.navLinks}
              to={"/signup"}
              onClick={() => {
                // handleLogin();
                closeNav();
              }}
            >
              Sign Up
            </Link>
          </li>
          {/* <li className={styles.navLi}>
            <StratifiedMenu isActive={isActive} closeNav={closeNav} />
          </li> */}
          <li className={styles.liMenu}>
            <Link
              to="#"
              onMouseEnter={handleToggle}
              className={styles.straMNLink}
            >
              More
            </Link>
          </li>
          <ul
            className={styles.ulSubMenu}
            style={{ display: isOpen ? "block" : "none" }}
          >
            <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
              <Link  className={styles.linkSubMeu} to="/profile" >Profile</Link>
            </li>
            <li className={styles.liSubMenu} onClick = {()=>{
              handleSubMenuItemClick()
              // handleShowCart()
            }}>
              <Link  className={styles.linkSubMeu} to={"/yourbooking"}>YourBooking</Link>
              <span className={styles.cartamuont}><sup>{soluong}</sup></span>
            </li>
            <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
              <Link  className={styles.linkSubMeu} to={"/createPost"}>CreatePost</Link>
            </li>
            <li className={styles.liSubMenu} onClick={handleSubMenuItemClick}>
              <Link  className={styles.linkSubMeu} to={"/"}>{/* <FaBell /> */}Notify</Link>
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
}
export default Nav;
