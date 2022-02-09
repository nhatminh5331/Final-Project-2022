import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Home from "./pages/gameHome/home";
import ActivationEmail from "./pages/auth/activationEmail"
import Notify from "./components/notify/Notify";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import NotFound from "./components/notfound";
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
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/api/reset/:token" component={ResetPassword} />
            <Route path="/api/activate/:activation_token" component={ActivationEmail} />
            <Route path="/:error" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
