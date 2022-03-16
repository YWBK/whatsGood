import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import UserShow from "./user_show";

const mSTP = (state, prevProps) => {
  debugger;
  return {
    currentUser: state.entities.users[state.session.user.id],
    user: state.entities.users[prevProps.match.params.userId],
    userLists: Object.values(state.entities.lists.all).filter(
      (list) => list.ownerId === prevProps.match.params.userId
    ),
  };
};

const mDTP = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(mSTP, mDTP)(UserShow);
