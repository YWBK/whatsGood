import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import UserShow from "./user_show";

const mSTP = (state, prevProps) => {
  return {
    currUser: state.users[prevProps.match.params.userId],
  };
};

const mDTP = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(mSTP, mDTP)(UserShow);
