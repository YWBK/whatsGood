import { connect } from "react-redux";
import SideNav from "./side_nav";

const mSTP = (state) => {
  // debugger
  return ({
    loggedIn: state.session.isAuthenticated,
    followingLists: state.session.user.followingLists
  })
};

const mDTP = (dispatch) => {
  return ({
    // need to add fetchLists here
  })
};

export default connect(mSTP, mDTP)(SideNav);
