import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../reduxProvider/userSlice';
import Swal from "sweetalert2";
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useSelector(selectUser);

  if (isAuthenticated) {
    return <Route {...rest} element={<Element />} />;
  } else {
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Error...',
    //   text: 'Hãy đăng nhập trước khi thực hiện',
    // });
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivateRoute;