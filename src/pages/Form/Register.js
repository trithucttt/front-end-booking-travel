import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill, RiMailFill } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
  const password = watch("password");
  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
      email: data.Email,
      role: data.roles,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:8086/api/registration",
        userData
      );
      console.log("register successfully", response.data);
      alert("register successfully");
      navigate("/login")
    } catch (err) {
      console.error("register failed", err);
      alert(
        "Registration failed. Please check your information and try again."
      );
    }
  };

  return (
    <div className={styles.bodyRegister}>
      {/* <Link to="/login">
            <button className={styles.btnRender}>
                Log In
            </button>
        </Link> */}
      <div className={styles.register}>
        <h2 className={styles.title}>Register</h2>
        <h3 className={styles.descries}>Register and service</h3>

        <form
          id={styles.form}
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <BiSolidUser />
            </span>
            <input
              className={styles.input}
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" &&  (
              <p className={styles.messageError}>UserName can't be empty!</p>
            )}
            <label className={styles.label}>UserName</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <RiLockPasswordFill />
            </span>
            <input
              className={styles.input}
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type === "minLength" &&
              (
                <p className={styles.messageError}>Password must not be less than 8 characters!</p>
              )}
            {errors.password?.type === "required" && (
              <p className={styles.messageError}>Password can't be empty!</p>
            )}
            <label className={styles.label}>Password</label>
          </div>
          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <RiLockPasswordFill />
            </span>
            <input
              className={styles.input}
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password ||  (
                    <p className={styles.messageError}>Password is not match!</p>
                  )
              })}
            />
            {/* notify error  */}
            {errors.confirmPassword?.message && (
              <p className={styles.messageError}>{errors.confirmPassword.message}</p>
            )}
            {errors.confirmPassword?.type === "required" &&
             (
              <p className={styles.messageError}>Password can't be empty!</p>
            )}
            <label className={styles.label}>ConfirmPassword</label>
          </div>

          <div className={styles.inputBox}>
            <span className={styles.icon}>
              <RiMailFill />
            </span>
            <input
              className={styles.input}
              type="email"
              {...register("Email", { required: true })}
            />
            {errors.Email?.type === "required" &&  (
              <p className={styles.messageError}>Email can't be empty!</p>)}
            <label className={styles.label}>Email</label>
          </div>
          <div className={styles.selectRole}>
            <label style={{ color: "#fff" }}>Select Role:</label>
            <select {...register("roles")}>
              <option value="USER">User</option>
              <option value="BUSINESS">Business</option>
              {/* <option value="ADMIN">Admin</option> */}
            </select>
          </div>
          <button className={styles.btn}>Register</button>
          <p className={styles.render}>Already have an account <Link to={"/login"}>Login now</Link></p>
        </form>
       
      </div>
    </div>
  );
}
export default Register;
