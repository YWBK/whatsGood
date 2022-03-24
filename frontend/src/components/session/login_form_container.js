import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { fetchUser } from '../../actions/user_actions';
import LoginForm from './login_form';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        currentUserId: state.session?.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: user => dispatch(login(user)),
        fetchUser: userId => dispatch(fetchUser(userId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);