import { connect } from 'react-redux';
import { fetchUserList } from '../../../actions/list_actions';
import ListShow from './list_show';


const mapStateToProps = (state) => {
    return {
        userList: Object.values(state.entities.lists.list)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserList: listId => dispatch(fetchUserList(listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListShow);