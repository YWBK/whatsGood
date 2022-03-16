import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SideNav from "./side_nav";
import { fetchUser } from '../../actions/user_actions'

const mSTP = (state) => {
  if (!state.session.isAuthenticated) return ({loggedIn: state.session.isAuthenticated})
  debugger
  return ({
    loggedIn: state.session.isAuthenticated,
    currentUserId: state.session.user.id,
    userListIds: state.session.user.myLists,
    followingListIds: state.session.user.followingLists,
    followingUsers: state.session.user.followingUsers,
    lists: state.entities.lists.list
  })
};

const mDTP = (dispatch) => {
  return ({
    fetchUser: userId => dispatch(fetchUser(userId))
  })
};

export default withRouter(connect(mSTP, mDTP)(SideNav));
