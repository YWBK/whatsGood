import { connect } from "react-redux";
import {
  fetchUser,
  unfollowUser,
  unfollowList,
  followList,
  followUser,
} from "../../actions/user_actions";
import UserShow from "./user_show";

const mSTP = (state, prevProps) => {
  // debugger
  // if (!state.entities.users)
  // return { currentUserId: state.session.user.id};

  if(!!state.entities.users === false){
    // debugger;
    return {
      currentUser: state.session.user,
      currentUserId: state.session.user._id
    }
  }
  
  // debugger
  return {
    currentUser: state.entities.users[state.session.user.id],
    currentUserId: state.session.user.id,
    user: state.entities.users[prevProps.match.params.userId],
    allLists: Object.values(state.entities.lists.all),
  };
};

const mDTP = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    unfollowUser: (userIdBeingFollowed, userId) =>
      dispatch(unfollowUser(userIdBeingFollowed, userId)),
    unfollowList: (listId, userId) => dispatch(unfollowList(listId, userId)),
    followList: (listId, userId) => dispatch(followList(listId, userId)),
    followUser: (userIdBeingFollowed, userId) =>
      dispatch(followUser(userIdBeingFollowed, userId)),
  };
};

export default connect(mSTP, mDTP)(UserShow);
