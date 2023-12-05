import { Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../SlideBar/Profile";
import Travel from "../pages/Application/Travel";
import Service from "../pages/Application/Service";
import Contact from "../pages/Application/Contact";
import Login from "../pages/Form/Login";
import Register from "../pages/Form/Register";
 import YourBooking from "../SlideBar/YourBooking";
import CreatePost from "../SlideBar/CreatePost";
// import Booking from "../SlideBar/Booking";
import PostDetail from "../pages/Home/PostDetail";
import Post from "../pages/Home/Post";
// import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxProvider/userSlice";
 import IndexCart from "../pages/Cart/IndexCart";
import Checkout from "../pages/Cart/Checkout";
function Routess() {
  const { isAuthenticated } = useSelector(selectUser);

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route
        path="profile"
        element={
          isAuthenticated ? (
            <Profile />
          ) : (
            <Navigate to={"/login"} replace={true} />
          )
        }
      />
       <Route
        path="yourBooking"
        element={
          isAuthenticated ? (
            <YourBooking />
          ) : (
            <Navigate to={"/login"} replace={true} />
          )
        }
      />
       <Route path="/checkout" element={<Checkout />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/service" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route
        path="createPost"
        element={
          isAuthenticated ? (
            <CreatePost />
          ) : (
            <Navigate to={"/login"} replace={true} />
          )
        }
      />
      {/* <Route path="/booking" element={<Booking />} /> */}
      <Route path="/post/:postId" element={<PostDetail />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}
export default Routess;
