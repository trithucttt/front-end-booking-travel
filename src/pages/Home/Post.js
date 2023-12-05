import Rating from "./Rating";
import styles from "./post.module.css";
// import React, { useState } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
function Post() {
 // const [post, setPost] = useState([]);
  // const [visiblePost,setVisiblePost] = useState(2)
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 2;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [Error,setError] = useState('')
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("http://localhost:8086/api/posts");
        setPosts(response.data);
        //   const city = post.location;
        console.log(response.data);
      } catch (error) {
        console.error("Get post failed", error);
      }finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  const handleSearch =async (e) => {
e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8086/api/search?keyword=${searchTerm}&cityName=${searchTerm}`);
      const allPosts = response.data;
  
      // Filter posts based on search term
  //    const filteredPosts = allPosts.filter((post) =>
   //   post.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setPosts(allPosts);
      setPageNumber(0); // Reset page number when performing a new search
      setError(null);
      setSearchTerm(searchTerm);
      console.log(searchTerm)
    } catch (error) {
      setError("An error occurred while searching.");
      setPosts([]);
    }
  };
  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = posts
  .slice(pagesVisited, pagesVisited + postsPerPage)
  .map((item) => (
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
            <li className={styles.ContentItem}>Mô tả: {item.content}</li>
            <li className={styles.ContentItem}>Tour: {item.dayTour}</li>
            <li className={styles.ContentItem}>Giới Thiệu :</li>
            <li className={styles.ContentItem}>Khu vực : {item.location}</li>
            <li className={styles.ContentItem}>Price: {item.price}₫</li>
          </ul>
        </div>
        <span className={styles.groupBtn}>
          {/* <button className={`${styles.customBtn} ${styles.btn1}`}> */}
            
          {/* </button> */}
          <Link to={`/post/${item.id}`} className={styles.linkPost}>
          <button className={`${styles.custombtn} ${styles.btn12}`}>
            <span>Click!</span>
            <span>
              Chi tiết
            </span>
            </button>
            </Link>
        </span>
        
      </article>
    </li>
  ));


const pageCount = Math.ceil(posts.length / postsPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};
  return (
    <>
      <div className={styles.searchItem}>
        <form className={styles.formSearch} onSubmit={handleSearch}>
          <input placeholder="Nhập tên tour"
           className={styles.formInputActive}
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)} />
          <button className={styles.formButton}
         type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div>
       {posts.length > 0 ? (
        <ul className={styles.post}>{displayPosts}</ul>
      ) : (
        <p>No results found.</p>
      )}
      
      </div>
      <ReactPaginate
       previousLabel={"Prev"}
       nextLabel={"Next"}
       pageCount={pageCount}
       onPageChange={changePage}
       containerClassName={styles.paginationBttns}
       previousLinkClassName={`${styles.custombtn10} ${styles.btn10}`}
       nextLinkClassName={`${styles.custombtn10} ${styles.btn10}`}
       disabledClassName={styles.paginationDisabled}
       activeClassName={styles.paginationActive}
      />
    </>
  );
}

export default Post;
