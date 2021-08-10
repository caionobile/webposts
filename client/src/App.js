import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/token", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-post">Create post</Link>
            {!auth && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create-post" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            {!auth && (
              <>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
              </>
            )}
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
