import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";

function App() {
  const isLoggedIn = sessionStorage.getItem("accessToken");
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/create-post">Create post</Link>
          {isLoggedIn
            ? null
            : [
                <Link to="/login">Login</Link>,
                <Link to="/signup">Sign Up</Link>,
              ]}
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-post" exact component={CreatePost} />
          <Route path="/post/:id" exact component={Post} />
          {isLoggedIn
            ? null
            : [
                <Route path="/login" exact component={Login} />,
                <Route path="/signup" exact component={SignUp} />,
              ]}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
