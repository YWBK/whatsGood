import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from "../util/route_util";


import MainPage from "./main/main_page";
import LoginFormContainer from './session/login_form_container';
import SignupForm1Container from './session/signup_form_container';

import "./reset.css"

const App = () => (
  <div>
    This is the App component of whatsGood
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupForm1Container} />

      {/* <ProtectedRoute exact path="/tweets" component={TweetsContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/new_tweet" component={TweetComposeContainer} /> */}
    </Switch>

  </div>
);

export default App;
