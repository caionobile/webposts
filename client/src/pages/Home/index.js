import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"

function Home() {
  const [posts, setPosts] = useState([]);
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
          <div className="post" key={key}>
            <div className="title"> {value.title}</div>
            <div className="body"> {value.postText}</div>
            <div className="footer"> {value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
