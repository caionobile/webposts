import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";

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
              if (res.data.liked)
                return {
                  ...post,
                  liked: !post.liked,
                  Likes: [...post.Likes, 0],
                };
              else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, liked: !post.liked, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      })
      .catch(() => alert("Must be logged in to like a post"));
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/posts",
        localStorage.getItem("accessToken") && {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        let allPosts = [];
        if (res.data.liked) {
          allPosts = res.data.allPosts;
          const { liked } = res.data;
          for (let i = 0; i < allPosts.length; i++) {
            allPosts[i].liked = liked[i];
          }
        } else allPosts = res.data;
        setPosts(allPosts);
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
            <div className="actions">
              {value.liked ? (
                <RiThumbUpFill
                  onClick={() => likePost(value.id)}
                  className="likeThumb"
                  id="liked"
                />
              ) : (
                <RiThumbUpLine
                  onClick={() => likePost(value.id)}
                  className="likeThumb"
                />
              )}
              <label>{value.Likes.length}</label>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Home;
