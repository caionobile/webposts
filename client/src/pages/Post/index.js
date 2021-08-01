import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
import axios from "axios";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="postPage">
      <div className="post" id="post">
        <div className="title"> {post.title}</div>
        <div className="body"> {post.postText}</div>
        <div className="footer"> {post.username}</div>
      </div>
      <div className="commentSection">Comment Section</div>
    </div>
  );
}

export default Post;
