import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./pages/register";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/:error" component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
