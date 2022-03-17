import React from 'react';
import './list_show.css';
import ListShowItem from "./list_show_item";
import ItemCompose from "../../items/item_compose_container"


class ListShow extends React.Component {
    constructor(props) {
        super(props);
        const listId = this.props.match.params.listId;
        // debugger

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

    // Called when component props changes.
    componentDidUpdate(prevProps) {
        const isLocationChanged = prevProps.match.params.listId !== this.props.match.params.listId;
        const listId = this.props.match.params.listId;
        const getListContent = async () => {
            if (isLocationChanged) {
                await this.props.fetchList(listId)
            }
            if (!this.state.list || isLocationChanged) {
                this.setState({ list: this.props.allLists[listId] });
            }
        }
        getListContent();
    }

    render() {
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
                                {(this.state.list.owner && this.state.list.owner.username) ? `by ${this.state.list.owner.username}` : ""
                                }
                            </div>
                            <div>
                                updated: {
                                    this.state.list.updatedAt > this.state.list.createdAt ? this.state.list.updatedAt : this.state.list.createdAt
                                }
                            </div>
                            <div>
                                {this.state.list.bookItems.map(book => (
                                    <ListShowItem
                                        book={book}
                                        key={book._id}
                                        listId={this.state.id}
                                        removeBookFromList={
                                            () => this.props.removeItemFromList(
                                                this.state.list.ownerId,
                                                book._id,
                                                this.props.match.params.listId
                                            )
                                        } />
                                ))}
                            </div>
                            <div>
                                <ItemCompose
                                    listId={this.props.match.params.listId}
                                    userId={this.state.list.ownerId} />
                            </div>

                        </div>
                    </div>
                )
            }</>;

    }
}

export default ListShow;