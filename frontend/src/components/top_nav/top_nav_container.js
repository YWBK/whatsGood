import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import TopNavMain from './top_nav_main';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

export default connect(
    mapStateToProps,
    { logout }
)(TopNavMain);