import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SideNav from "./side_nav";
import { fetchUser } from '../../actions/user_actions'

const mSTP = (state) => {
  if (!state.session.isAuthenticated) return ({loggedIn: state.session.isAuthenticated})
  const currentUserId = state.session.user.id
  if (Object.keys(state.entities.users).length < 1) return (
    {loggedIn: state.session.isAuthenticated, currentUserId: currentUserId})

  // debugger
  const followingLists = Object.values(state.entities.lists.all).map(list => {
    // debugger
    if (list.ownerId !== currentUserId) return ({
        id: list.id,
        name: list.name,
        ownerName: list.ownerName
    });
  })
const myLists = Object.values(state.entities.lists.all).map(list => {
  if (list.ownerId === currentUserId) return ({
    id: list.id,
    name: list.name 
  })
});

// debugger
const followingUsers = Object.values(state.entities.users[currentUserId].followingUsers).map(user => {
  // debugger
  if (user.id !== currentUserId) return ({
    id: user.id,
    username: user.username 
  })
});
// debugger
   
  return ({
    loggedIn: state.session.isAuthenticated,
    currentUserId: currentUserId,
    // userListIds: state.entities.users[currentUserId].myLists,
    // followingListIds: state.entities.users[currentUserId].followingLists,
    // followingUserIds: state.entities.users[currentUserId].followingUsers,
    myLists: myLists,
    followingLists: followingLists,
    followingUsers: followingUsers,
    lists: state.entities.lists.all
  })
};

const mDTP = (dispatch) => {
  return ({
    fetchUser: userId => dispatch(fetchUser(userId))
  })
};

export default withRouter(connect(mSTP, mDTP)(SideNav));
