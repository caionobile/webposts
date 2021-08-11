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
import LogoutModal from "./components/LogoutModal";

function App() {
  const [auth, setAuth] = useState(false);
  const [showLogoff, setShowLogoff] = useState(false);
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

  const openLogoffModal = () => {
    setShowLogoff((prev) => !prev);
  };

  const logout = () => {
    setShowLogoff(false);
    setAuth(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            {auth ? (
              <>
                <Link to="/create-post">Create post</Link>
                <a
                  id="logoff"
                  onClick={() => {
                    openLogoffModal();
                    console.log(showLogoff);
                  }}
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/post/:id" exact component={Post} />
            {auth ? (
              <Route path="/create-post" exact component={CreatePost} />
            ) : (
              <>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
              </>
            )}
          </Switch>
        </Router>
        <LogoutModal
          showModal={showLogoff}
          setShowModal={setShowLogoff}
          onLogout={logout}
        />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
