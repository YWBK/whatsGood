import { connect } from "react-redux";
import { fetchUser, unfollowUser } from "../../actions/user_actions";
import UserShow from "./user_show";

const mSTP = (state, prevProps) => {
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
  };
};

export default connect(mSTP, mDTP)(UserShow);
