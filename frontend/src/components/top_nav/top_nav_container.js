import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import TopNav from "./top_nav";

const mapStateToProps = (state) => {
  return {
    currUserId: state.session.user ? state.session.user.id : null,
    loggedIn: state.session.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(TopNav);
