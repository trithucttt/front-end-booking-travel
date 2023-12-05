import { useEffect, useState, useRef } from "react";
// import CaMau from "../NavBars/access/CaMau.jpg";
import styles from "./Profile.module.css";
import { FaPenToSquare } from "react-icons/fa6";

// import { useDispatch } from "react-redux";
// import {setAvatar} from './Style/action'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Profile() {
  const [avatar, setAvatar] = useState();
  const inputRef = useRef(null);
  const [initialInfo, setInitialInfor] = useState(null);
  const [user, setUser] = useState({});
  const [Edit, setEdit] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const usernameRef = useRef(null);
  const [saveAvatar, setSaveAvatar] = useState(false);
  // getToken from localstorage
  const token = localStorage.getItem("token");

  // console.log(token);
  //call api infor
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8086/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setInitialInfor(response.data);
        setUser(response.data);
        if (response.status === 200) {
          // Nếu mã trạng thái là 200 OK, trả về dữ liệu người dùng
          return response.data;
        } else {
          // Xử lý trường hợp khác mã trạng thái 200 (nếu có)
          console.error("Unexpected response status:", response.status);
          return null;
        }
      } catch (error) {
        // Xử lý lỗi từ phía máy chủ hoặc lỗi mạng
        console.error("Error fetching user profile:", error.message);
        return null;
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (Edit) {
      setUser({ ...initialInfo });
    }
  }, [Edit, initialInfo]);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      // Set a state to track if the email is valid
      setIsValidEmail(isValidEmail);
    }
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleClickEdit = () => {
    setEdit(true);
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  };
  const handleClickSave = async () => {
    if (Edit && isValidEmail === false) {
      alert("Invalid email. Cannot save changes!");
      return;
    }
    console.log("save new user: ", user);
    setEdit(false);
    try {
      const response = await axios.post(
        "http://localhost:8086/api/save-user",
        user
      );

      // console.log("Save user information Successfully");
      toast.success("Save user information Successfully");
    } catch (error) {
      console.error("Error while saving user information:", error);
    }
  };
  const handleClickCancel = () => {
    // Reset the state to its initial values when canceling
    setEdit(false);
    setUser({ ...initialInfo });
  };

  const handleReview = (e) => {
    // Xử lý ảnh từ  input
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avataData = { preview: e.target.result };
        //  dispath(setAvatar(avataData));
        setAvatar(avataData);
        // dispath({type:'SET_AVATA', payload: avataData});
      };
      reader.readAsDataURL(file);
      setSaveAvatar(true);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click(); // chuyển từ button  -> inputImage
  };

  const handleUpload = async () => {
    let filename;
    try {
      const formData = new FormData();
      formData.append("file", inputRef.current.files[0]);
      //   console.log("Uploaded filename:" , formData.append('file', inputRef.current.files[0]));
      const response = await axios.post(
        "http://localhost:8086/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      filename = response.data;
        setSaveAvatar(false)
      // console.log("image name upload", filename);
      toast.success("upload image successfully");
    } catch (error) {
      console.error("Error uploading image", error.message);
      toast.error("upload image error");
    }
  };
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const filename = initialInfo.profileImage;
        console.log("initialInfo log", initialInfo);
        console.log("filename log", filename);
        const username = initialInfo.username;
        const response = await axios.get(
          `http://localhost:8086/api/files/${username}/${filename}`,
          {
            responseType: "arraybuffer",
          }
        );
        // Convert the binary data to a base64 string
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } catch (error) {
        // Handle errors
        setError(error.message);
      }
    };
    fetchImage();
  }, [initialInfo]);

  return (
    <div>
      <div className={styles.bodyProfile}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            {avatar ? (
              <img
                className={styles.avatarUserActive}
                src={avatar.preview}
                alt="Avatar"
              />
            ) : (
              imageData && (
                <img
                  className={styles.avatarUserActive}
                  src={imageData}
                  alt="avatar"
                />
              )
            )}
          </div>
          <button className={styles.btn1} onClick={handleButtonClick}>
          <FaPenToSquare className={styles.iconUpload}/>
          </button>
          <input
            type="file"
            ref={inputRef}
            onChange={handleReview}
            style={{ display: "none" }}
          />
          <button
            className={saveAvatar ? styles.btn : styles.hiddenSave}
            onClick={handleUpload}
          >
            Save
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.bodyContent}>
            {Object.entries(user).map(([key, value]) => {
              // List of properties to exclude
              const excludedProperties = [
                "password",
                "posts",
                "profileImage",
                "role",
                "yourBooking",
                "id",
              ];
              // Skip rendering excluded properties
              if (excludedProperties.includes(key)) {
                return null;
              }
              return (
                <div key={key} className={styles.inputContainer}>
                  <label className={styles.titleInput}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {Edit ? (
                    <>
                      <input
                        className={`${styles.input} ${
                          key === "email" && !isValidEmail
                            ? styles.invalidEmail
                            : ""
                        }`}
                        type={key === "email" ? "email" : "text"}
                        name={key}
                        value={value}
                        ref={usernameRef}
                        onChange={handleChange}
                        disabled={key === "username"}
                      />
                      {key === "email" && !isValidEmail && (
                        <p className={styles.errorMsg}>
                          Please enter a valid email address.
                        </p>
                      )}
                    </>
                  ) : (
                    <input
                      className={styles.input}
                      type={key === "email" ? "email" : "text"}
                      name={key}
                      value={value}
                      disabled
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.footer}>
            {Edit ? (
              <>
                <button className={styles.btn} onClick={handleClickSave}>
                  Save
                </button>
                <button className={styles.btn} onClick={handleClickCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* <button className={styles.btn} onClick={() => setEdit(true)}>Add</button> */}
                <button className={`${styles.custombtn} ${styles.btn12}`} onClick={handleClickEdit}><span>Click!</span><span>Edit</span></button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Profile;
