import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import HeaderSlider from "./HeaderSlider";
import Rating from "./Rating";
// import React, { useState } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../share/Footer/Footer";
// import Swal from "sweetalert2";
function Home() {
  const [post, setPost] = useState([]);
  const [visiblePost, setVisiblePost] = useState(2);
  const [idPost,setIdPost]= useState();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("http://localhost:8086/api/posts");
        setPost(response.data);
       const  idpost1 = response.data[0].id
        console.log(idpost1);
        setIdPost(idpost1)

        console.log(response.data);
      } catch (error) {
        // Swal.fire('SweetAlert2 is working!')
        console.error("Get post failed", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <div>
        <HeaderSlider />
      </div>
      <div>
        <ul className={styles.post}>
          {post.slice(0, visiblePost).map((item, index) => (
            <li className={styles.postFrame} key={item.id}>
              <article className={styles.article}>
                <div className={styles.postLeft}>
                  <span className={styles.postHeder}>
                    <img
                      className={styles.postImageUser}
                      alt="User"
                      src={`http://localhost:8086/api${item.avatarUser}`}
                    />
                    <h4 className={styles.postNameUser}>{item.username}</h4>
                  </span>
                  <span className={styles.postBodyImage}>
                    <img
                      className={styles.postImage}
                      alt="post"
                      src={`http://localhost:8086/api/upload/imagePost/${item.id}`}
                    />
                  </span>
                </div>
                <div className={styles.postBody}>
                  <ul className={styles.postContent}>
                    <li className={`${styles.ContentItem} ${styles.titleTour}`}>
                      {item.name}
                    </li>
                    <li className={styles.ContentItem}>
                      Mô tả: {item.content}
                    </li>
                    <li className={styles.ContentItem}>Tour: {item.dayTour}</li>
                    <li className={styles.ContentItem}>Giới Thiệu :</li>
                    <li className={styles.ContentItem}>
                      Khu vực : {item.location}
                    </li>
                    <li className={styles.ContentItem}>Price: {item.price}₫</li>
                  </ul>
                </div>
                <span className={styles.groupBtn}>
                  {/* </button> */}
                  <Link to={`/post/${item.id}`} className={styles.linkPost}>
                    <button className={`${styles.custombtn} ${styles.btn12}`}>
                      <span>Click!</span>
                      <span>Chi tiết</span>
                    </button>
                  </Link>
                </span>
              </article>
            </li>
          ))}
        </ul>
        <Link className={styles.linkSeeMore} to={"/post"}>
          <button
            className={`${styles.custombtn} ${styles.custombtn2}  ${styles.btn2}`}
          >
            See more
          </button>
        </Link>
      </div>
      <label className={styles.labelLocation}>Địa điểm nổi tiếng</label>
      <ul className={styles.groupImage}>
        <li>
           <span className={styles.postBodyImage}>
                    <img
                      className={styles.postImage}
                      alt="post"
                      src={`http://localhost:8086/api/upload/imagePost/${idPost}`}
                    />
                  </span>
        </li>
        <li >
           <span className={styles.postBodyImage}>
                    <img
                      className={styles.postImage}
                      alt="post"
                      src={`http://localhost:8086/api/upload/imagePost/${idPost}`}
                    />
                  </span>
        </li>
        <li >
          <span className={styles.postBodyImage}>
                    <img
                      className={styles.postImage}
                      alt="post"
                      src={`http://localhost:8086/api/upload/imagePost/${idPost}`}
                    />
                  </span>
        </li>
        <li >
           <span className={styles.postBodyImage}>
                    <img
                      className={styles.postImage}
                      alt="post"
                      src={`http://localhost:8086/api/upload/imagePost/${idPost}`}
                    />
                  </span>
        </li>
      </ul>
      
    </div>
  );
}

export default Home;
