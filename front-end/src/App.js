import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";
import ActivationEmail from "./pages/activationEmail"
import Notify from "./components/notify/Notify";
import {useSelector, useDispatch} from "react-redux"
import {refreshToken} from "./redux/actions/authAction"

function App() {
  const {authReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(refreshToken())
  },[dispatch])

  return (
    <Router>
      <Notify />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Switch>
            <Route exact path="/" component={authReducer.token ? Home : Login} />
            <Route path="/register" component={Register} />
            <Route path="/user/activate/:activation_token" component={ActivationEmail} />
            <Route path="/:error" component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
