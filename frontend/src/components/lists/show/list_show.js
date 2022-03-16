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
    componentDidUpdate(prevProps) {
        const isLocationChanged = prevProps.match.params.listId !== this.props.match.params.listId;
        const listId = this.props.match.params.listId;
        if (!this.state.list || isLocationChanged) {
            this.setState({ list: this.props.allLists[listId] });
        }
    }

    render() {
        // console.log(this.props)
        // const listId = this.props.match.params.listId;

        return <>
            {
                this.state.list && (
                    <div className="list-outer-box">
                        <div className='list-inner-box'>
                            <h2>{this.state.list.name}</h2>
                            <div>
                                {this.state.list.description}
                            </div>
                            <div>
                                created by: {this.state.list.owner}
                            </div>
                            <div>
                                last updated time: {
                                    this.state.list.updatedAt > this.state.list.createdAt ? this.state.list.updatedAt : this.state.list.createdAt
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