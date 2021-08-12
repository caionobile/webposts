import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
import axios from "axios";
import Card from "../../components/comments/CommentCard";
import { AuthContext } from "../../helpers/AuthContext";

function Post() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
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
        .post(
          "http://localhost:3001/comments",
          {
            commentBody: comment,
            PostId: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          setComments([
            ...comments,
            {
              id: res.data.id,
              commentBody: comment,
              username: res.data.username,
            },
          ]);
          setComment("");
        })
        .catch(() => alert("Must be logged in to comment"));
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3001/comments/${commentId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== commentId;
          })
        );
      })
      .catch((e) => {
        console.log(e);
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
        console.log();
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
            <Card data={comment} key={key}>
              {auth.username === comment.username ? (
                <button onClick={() => deleteComment(comment.id)}>X</button>
              ) : null}
            </Card>
          ))}
        </div>
        <div className="addCommentSection">
          <form className="commentForm">
            <input
              type="text"
              placeholder="Comment here"
              autoComplete="off"
              value={comment}
              onChange={setCommentHandler}
              className="commentInput"
            />
            <button
              type="submit"
              onClick={addComment}
              className="commentButton"
            >
              Add comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
