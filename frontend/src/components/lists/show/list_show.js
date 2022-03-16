import React from 'react';
import './list_show.css';
import ListShowItem from "./list_show_item";


class ListShow extends React.Component {
    constructor(props) {
        super(props);
        const listId = this.props.match.params.listId;
        this.state = {
            list: this.props.allLists[listId],
        }
    }

    componentWillMount() {
        const listId = this.props.match.params.listId;

        if (!this.props.allLists[listId]) {
            this.props.fetchList(listId);
        }
    }

    // Called when component propos changes.
    componentDidUpdate() {
        const listId = this.props.match.params.listId;
        if (!this.state.list) {
            this.setState({ list: this.props.allLists[listId] });
        }
    }

    render() {
        const listId = this.props.match.params.listId;
        const { name, description, owner, createdAt, updatedAt } = this.props.allLists[listId];

        return <>
            {
                this.state.list && (
                    <div className="list-outer-box">
                        <div className='list-inner-box'>
                            <h2>{name}</h2>
                            <div>
                                {description}
                            </div>
                            <div>
                                created by: {owner}
                            </div>
                            <div>
                                last updated time: {
                                    updatedAt > createdAt ? updatedAt : createdAt
                                }
                            </div>
                            {this.state.list.bookItems.map(book => (
                                <ListShowItem book={book} key={book._id} />
                            ))}

                        </div>
                    </div>
                )
            }</>;

    }
}

export default ListShow;