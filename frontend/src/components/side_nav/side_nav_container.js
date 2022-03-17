import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SideNav from "./side_nav";
import { fetchUser } from '../../actions/user_actions';
import { fetchList, addList } from '../../actions/list_actions';

const mSTP = (state) => {

  if (!state.session.isAuthenticated) return ({loggedIn: state.session.isAuthenticated})
  const currentUserId = state.session.user.id
  const allLists = state.entities.lists.all
  if (Object.keys(state.entities.users).length < 1) return (
    {loggedIn: state.session.isAuthenticated, currentUserId: currentUserId})
    const followingLists = Object.values(allLists).map(list => {
    if (state.session.user.followingLists.includes(list.id)) {return ({
        id: list.id,
        name: list.name,
        ownerName: list.ownerName,
        bookItems: list.bookItems
    })} else {
      return null;
    };
  })
  const myLists = Object.values(allLists).map(list => {
  if (list.ownerId === currentUserId) {return ({
    id: list.id,
    name: list.name,
    booktItems: list.bookItems
  })} else {
    return null;
  }
});
const followingUsers = Object.values(state.entities.users[currentUserId].followingUsers).map(user => {
  if (user.id !== currentUserId) {return ({
    id: user.id,
    username: user.username 
  })} else {
    return null;
  }
});

  return ({
    loggedIn: state.session.isAuthenticated,
    currentUserId: currentUserId,
    // allLists: allLists,
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
    fetchList: listId => dispatch(fetchList(listId)),
    addList: data => dispatch(addList(data))
  })
};

export default withRouter(connect(mSTP, mDTP)(SideNav));
