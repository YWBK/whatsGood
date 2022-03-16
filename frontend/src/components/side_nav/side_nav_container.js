import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SideNav from "./side_nav";
import { fetchUser } from '../../actions/user_actions';
import { fetchList } from '../../actions/list_actions';

const mSTP = (state) => {

  if (!state.session.isAuthenticated) return ({loggedIn: state.session.isAuthenticated})
  const currentUserId = state.session.user.id
  if (Object.keys(state.entities.users).length < 1) return (
    {loggedIn: state.session.isAuthenticated, currentUserId: currentUserId})
  const followingLists = Object.values(state.entities.lists.all).map(list => {
    // debugger
    if (state.session.user.followingLists.includes(list.id)) return ({
        id: list.id,
        name: list.name,
        ownerName: list.ownerName
    });
  })
const myLists = Object.values(state.entities.lists.all).map(list => {
  // debugger
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
    myLists: myLists,
    followingLists: followingLists,
    followingUsers: followingUsers,
    myListIds: state.session.user.myLists,
    followingListIds: state.session.user.followingLists,
    followingUserIds: state.session.user.followingUsers
  })
};

const mDTP = (dispatch) => {
  return ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchList: listId => dispatch(fetchList(listId))
  })
};

export default withRouter(connect(mSTP, mDTP)(SideNav));
