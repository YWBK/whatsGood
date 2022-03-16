import { connect } from 'react-redux';
import ItemCompose from './item_compose';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        // newItem: state.tweets.new
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // composeItem: data => dispatch(composeItem(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCompose);