import { connect } from "react-redux";
import SideNav from "./side_nav";
import { fetchUser } from '../../actions/user_actions'

const mSTP = (state) => {
  // debugger
  return ({
    loggedIn: state.session.isAuthenticated,
    userLists: state.session.user.myLists,
    followingLists: state.session.user.followingLists,
    followingUsers: state.session.user.followingUsers
  })
};

const mDTP = (dispatch) => {
  return ({
    fetchUser: userId => dispatch(fetchUser(userId))
  })
};

export default connect(mSTP, mDTP)(SideNav);
