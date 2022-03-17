import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

// import TopNavAuth from "./top_nav/top_nav_auth";
import TopNavContainer from "./top_nav/top_nav_container";
import SideNavContainer from "./side_nav/side_nav_container";
import Splash from './splash/splash';
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupForm1Container from "./session/signup_form_container";
import ListShowContainer from "./lists/show/list_show_container";
import UserShowContainer from "./users/user_show_container";
import ItemsShow from "./items/items_show";

import "./reset.css";

const App = () => (
  <div>
    <TopNavContainer />
    <div className='main-content' style={{ display: "flex" }}>
      <SideNavContainer />
      <Switch>
        {/* <AuthRoute exact path="/" component={MainPage} /> */}
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupForm1Container} />
        <ProtectedRoute
          exact
          path="/lists/:listId"
          component={ListShowContainer}
        />
        <ProtectedRoute
          exact
          path="/users/:userId"
          component={UserShowContainer}
        />
        <ProtectedRoute
          exact
          path="/items/:itemId"
          component={ItemsShow}
        />
        <AuthRoute exact path="/" component={MainPage} />
      </Switch>
    </div>
  </div>
);

export default App;
