import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

// import TopNavAuth from "./top_nav/top_nav_auth";
import TopNavContainer from "./top_nav/top_nav_container";
import SideNavContainer from "./side_nav/side_nav_container";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupForm1Container from "./session/signup_form_container";
import ListShowContainer from "./lists/show/list_show_container";

import "./reset.css";

const App = () => (
  <div>
    <TopNavContainer />
    <SideNavContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupForm1Container} />
      <ProtectedRoute exact path="/lists/:listId" component={ListShowContainer} />
      {/* <ProtectedRoute exact path="/tweets" component={TweetsContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/new_tweet" component={TweetComposeContainer} /> */}
    </Switch>
  </div>
);

export default App;
