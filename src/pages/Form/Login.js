import { BiSolidUser } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwt_Decode from "jwt-decode";
import { loginSuccess } from "../../reduxProvider/userSlice";
function Login() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };

    // console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:8086/api/login",
        userData
      );
      // Xử lý dữ liệu và lưu token vào localStorage
      const apiresponse = response.data;

      const accessToken = apiresponse.Data.token;
      // token Token từ server
      localStorage.setItem("token", accessToken);
      // giải mã token lấy username
      const decodeToken = jwt_Decode(accessToken);
      //console.log(decodeToken);
      const userFromserver = decodeToken.sub;
      console.log(userFromserver);
      dispath(loginSuccess(userFromserver));
      //Object Data chứa token và refreshToken
      // console.log(apiresponse.Data);

      // oblect Được server phản hồi

      //console.log(apiresponse);

      console.log(accessToken);
      //toast.success('Login successfully');
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      // toast.error("Login failed:",error);
      // Xử lý lỗi, ví dụ hiển thị thông báo cho người dùng
      //console.error("Login failed:", error);
      //alert("Login failed:");
      if(error.response && error.response.status === 401){
        toast.error("Password or username incorrect");
      }else{
        toast.error("Login failed:",error.message || "unknown error");

      }
    }
  };

  return (
    <>
      <div className={styles.bodyBackground}>
        <div className={styles.loginForm}>
          <h2 className={styles.title}>Login</h2>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputBox}>
              <span className={styles.icon}>
                <BiSolidUser />
              </span>
              <input
                className={styles.input}
                type="text"
                {...register("username", { required: true })}
              />
              <label className={styles.titleInput}>UserName</label>
            </div>
            <div className={styles.inputBox}>
              {/* <span className={styles.icon}><RiLockPasswordFill/></span> */}
              <span className={styles.icon}>
                <AiFillEyeInvisible />
              </span>
              <input
                className={styles.input}
                type="password"
                {...register("password", { required: true })}
              />
              <label className={styles.titleInput}>Password</label>
            </div>

            <button className={styles.btn}>Login</button>
            <Link to="/login" className={styles.render}>
              <button className={styles.btn}>Or Login with </button>
            </Link>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default Login;
