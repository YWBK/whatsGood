import { connect } from 'react-redux';
import { fetchList } from '../../../actions/list_actions';
import { removeItemFromList } from '../../../actions/item_actions';
import ListShow from './list_show';


const mapStateToProps = (state) => {
    // debugger
    return {
        allLists: Object.assign({}, state.entities.lists.all)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchList: listId => dispatch(fetchList(listId)),
        removeItemFromList: (userId, volumeId, listId) => dispatch(removeItemFromList(userId, volumeId, listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListShow);