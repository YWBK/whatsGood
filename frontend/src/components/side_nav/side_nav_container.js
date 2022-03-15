import { connect } from "react-redux";
import SideNav from "./side_nav";

const mSTP = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

const mDTP = (dispatch) => ({});

export default connect(mSTP, mDTP)(SideNav);
