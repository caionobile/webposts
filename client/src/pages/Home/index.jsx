import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              if (res.data.liked) return { ...post, Likes: [...post.Likes, 0] };
              else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      {posts.map((value, key) => {
        return (
          <>
            <div
              className="post"
              key={key}
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              <div className="title"> {value.title}</div>
              <div className="body"> {value.postText}</div>
              <div className="footer">{value.username}</div>
            </div>
            <button onClick={() => likePost(value.id)}>Like</button>
            <label>{value.Likes.length}</label>
          </>
        );
      })}
    </div>
  );
}

export default Home;
