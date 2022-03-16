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
        // debugger
        if (!this.props.allLists[listId]) {
            this.props.fetchList(listId);
        }
    }

    // Called when component props changes.
    componentDidUpdate(prevProps) {
        // debugger

        const isLocationChanged = prevProps.match.params.listId !== this.props.match.params.listId;
        const listId = this.props.match.params.listId;
        if (!this.state.list || isLocationChanged) {
            this.setState({ list: this.props.allLists[listId] });
        }
    }

    render() {
        // console.log(this.props)
        // const listId = this.props.match.params.listId;
        // debugger

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
                                    <ListShowItem book={book} key={book._id} />
                                ))}
                            </div>
                            <div>
                                <ItemCompose />
                            </div>

                        </div>
                    </div>
                )
            }</>;

    }
}

export default ListShow;