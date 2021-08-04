import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
import axios from "axios";
import Card from "../../components/comments/CommentCard";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const setCommentHandler = (event) => {
    setComment(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();
    if (comment)
      axios
        .post("http://localhost:3001/comments", {
          commentBody: comment,
          PostId: id,
        })
        .then(() => {
          setComments([...comments, { commentBody: comment }]);
          setComment("");
        });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((e) => console.log(e));

    axios
      .get(`http://localhost:3001/comments/${id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <div className="postPage">
      <div className="post" id="post">
        <div className="title"> {post.title}</div>
        <div className="body"> {post.postText}</div>
        <div className="footer"> {post.username}</div>
      </div>
      <div className="commentSection">
        <div className="commentsArea">
          {comments.map((comment, key) => (
            <Card data={comment} key={key} />
          ))}
        </div>
        <div className="addCommentSection">
          <form>
            <input
              type="text"
              placeholder="Comment here"
              autoComplete="off"
              value={comment}
              onChange={setCommentHandler}
            />
            <button type="submit" onClick={addComment}>
              Add comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
