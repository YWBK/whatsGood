import { connect } from 'react-redux';
import { fetchList, removeList, updateName, updateDescription } from '../../../actions/list_actions';
import { addItemToList } from '../../../actions/item_actions';
import { removeItemFromList } from '../../../actions/item_actions';
import ListShow from './list_show';
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        allLists: Object.assign({}, state.entities.lists.all),
        currentUserId: state.session.user.id,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchList: listId => dispatch(fetchList(listId)),
        addItemToList: (volumId, listId, userId) => dispatch(addItemToList(volumId, listId, userId)),
        removeItemFromList: (userId, volumeId, listId) => dispatch(removeItemFromList(userId, volumeId, listId)),
        removeList: (listId, userId) => dispatch(removeList(listId, userId)),
        updateName: (listId, userId, newlistName) => dispatch(updateName(listId, userId, newlistName)),
        updateDescription: (listId, userId, newlistDescription) => dispatch(updateDescription(listId, userId, newlistDescription)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListShow));