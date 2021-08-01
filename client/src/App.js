import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/";
import CreatePost from "./pages/CreatePost/";
import Post from "./pages/Post/";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/create-post">Create post</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-post" exact component={CreatePost} />
          <Route path="/post/:id" exact component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
