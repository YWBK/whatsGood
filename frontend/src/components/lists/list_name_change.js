import * as React from "react";
// import './list_show_item.css';

class ListShowItem extends React.Component {

    constructor() {
        super();
        this.state = { active: true, listName: '' };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClick);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    handleOuterClick(e) {
        if (
            this.sideNav.current &&
            !this.sideNav.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }
    }

    updateListName() {
        if (this.props.showType === 'workspace') {
            const oldListName = this.props.currentList.ListName;
            const ListId = this.props.currentList.id
            const List = Object.assign({}, { id: ListId, List_name: this.state.ListName });
            if (oldListName !== this.state.ListName) {
                this.props.updateList(List);
            } else {
                null;
            }
        } else {
        }
    }

    render() {
        const { book } = this.props;

        return (
            <>
                {
                    this.state.book &&
                    <div className="book-row">
                        <div onClick={() => this.updateListName()} >
                            <h2>{this.state.list.name}</h2>
                        </div>
                    </div>
                }
            </>
        );
    }
}
export default ListShowItem;






