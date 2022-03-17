import { connect } from 'react-redux';
import ItemCompose from './item_compose';
import { addItemToList } from '../../actions/item_actions';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItemToList: (volumId, listId, userId) => dispatch(addItemToList(volumId, listId, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCompose);