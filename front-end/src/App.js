import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/:error" component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
