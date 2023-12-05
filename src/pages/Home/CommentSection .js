import React, { useState } from "react";
import styles from "./CommentSection.module.css"; // Thay thế bằng tên file CSS thực tế
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

function CommentSection() {
  const [comments, setComments] = useState([
    { id: 1, user: "John Doe", content: "Great post!" },
    { id: 2, user: "Jane Smith", content: "Awesome content!" },
    // Thêm các bình luận khác tại đây
  ]);

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
 
      if (newComment.trim() !== "") {
        const newCommentObject = {
          id: comments.length + 1,
          user:"username",
          content: newComment,
        };
        setComments([...comments, newCommentObject]);
        setNewComment("");
      
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2 className={styles.title}>Comments</h2>
      <ul className={styles.frame}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.comment}>
            <strong>{comment.user}:</strong> {comment.content}
          </li>
        ))}
      </ul>
      <div className={styles.newComment}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
        ></textarea>
        <button className={styles.btnComment} onClick={handleAddComment}>Add Comment</button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CommentSection;
