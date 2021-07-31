import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="create-post">Create a post</Link>
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-post" exact component={CreatePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
