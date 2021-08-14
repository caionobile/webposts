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
  const [auth, setAuth] = useState({ username: "", id: 0, status: false });
  const [showLogout, setshowLogout] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/token", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setAuth({ username: res.data.username, id: res.data.id, status: true });
      })
      .catch(() => {
        setAuth({ ...auth, status: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openLogoffModal = () => {
    setshowLogout((prev) => !prev);
  };

  const logout = () => {
    setshowLogout(false);
    setAuth({ username: "", id: 0, status: false });
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            {auth.status ? (
              <>
                <Link to="/create-post">Create post</Link>
                <div id="username">{auth.username}</div>
                <button
                  id="logoff"
                  onClick={() => {
                    openLogoffModal();
                  }}
                >
                  Logout
                </button>
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
            {auth.status ? (
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
          showModal={showLogout}
          setShowModal={setshowLogout}
          onLogout={logout}
          username={auth.username}
        />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
