import React from 'react';
import './list_show.css';

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
        return <>
            {
                this.state.list && (
                    <div className="list-outer-box">
                        <div className='list-inner-box'>
                            <h2>Your Books</h2>
                            {this.state.list.bookItems.map(book => (
                                <div>{book._id}</div>
                            ))}
                        </div>
                    </div>
                )
            }</>;

    }
}

export default ListShow;