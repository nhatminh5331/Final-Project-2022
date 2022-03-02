import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Home from "./pages/homePage/home";
import ActivationEmail from "./pages/auth/activationEmail"
import Notify from "./components/notify/Notify";
import Header from "./components/header/Header";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import NotFound from "./components/notfound";
import Profile from "./pages/profile/IdUser";
import {useSelector, useDispatch} from "react-redux"
import {refreshToken} from "./redux/actions/authAction"
import { getPosts } from './redux/actions/postAction';
import CreatePost from "./components/newPost/newPost"

function App() {
  const {authReducer, statusReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(refreshToken())
  },[dispatch])

  useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

  return (
    <Router>

      <Notify />

      {authReducer.token && <Header />}
      {statusReducer && <CreatePost />}

      <div className="App">
        <div className="main">
          <Switch>
            <Route exact path="/" component={authReducer.token ? Home : Login} />
            <Route exact path="/register" component={authReducer.token ? NotFound : Register} />
            <Route path="/forgotpassword" component={authReducer.token ? NotFound : ForgotPassword} />
            <Route path="/api/reset/:token" component={authReducer.token ? NotFound : ResetPassword} />
            <Route path="/api/activate/:activation_token" component={authReducer.token ? NotFound : ActivationEmail} />
            <Route path= "/profile/:id" component={Profile} />
            <Route path="/:error" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
