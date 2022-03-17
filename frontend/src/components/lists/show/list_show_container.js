import { connect } from 'react-redux';
import { fetchList } from '../../../actions/list_actions';
import { addItemToList } from '../../../actions/item_actions';
import ListShow from './list_show';


const mapStateToProps = (state) => {
    return {
        allLists: Object.assign({}, state.entities.lists.all),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchList: listId => dispatch(fetchList(listId)),
        addItemToList: (volumId, listId, userId) => dispatch(addItemToList(volumId, listId, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListShow);