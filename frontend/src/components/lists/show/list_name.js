import * as React from "react";
import './list_name.css';
import { withRouter } from 'react-router-dom';

class ListName extends React.Component {

    constructor(props) {
        super(props);
        // debugger
        this.state = { listName: this.props.listName, listDescription: this.props.listDescription };

        this.updateListName = this.updateListName.bind(this);
        this.updateListDescription = this.updateListDescription.bind(this);
        // this.handleOuterClick = this.handleOuterClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     document.addEventListener('mousedown', this.handleOuterClick);
    // }
    // handleOuterClick(e) {
    //     console.log("outter click")
    // }

    onKeyDown(e) {
        if (e.key === "Enter") {
            e.target.blur();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        const listId = this.props.listId;
        const userId = this.props.listOwnerId;
        const newlistName = this.state.listName;
        const newlistDescription = this.state.listDescription;
        this.props.updateName(listId, userId, newlistName);
        this.props.updateDescription(listId, userId, newlistDescription);
    }

    updateListName(e) {
        this.setState({ listName: e.currentTarget.value });
    }
    updateListDescription(e) {
        this.setState({ listDescription: e.currentTarget.value });
    }

    componentWillUnmount() {
        // document.removeEventListener('mousedown', this.handleOuterClick);
        document.removeEventListener('mousedown', this.onKeyDown);
        // debugger
    }

    componentDidUpdate(prevProps) {
        const newList = this.props.allLists[this.props.match.params.listId];
        const newListName = newList.name;
        const newListDesc = newList.description;
        const locationChanged = 
            prevProps.match.params.listId !== this.props.match.params.listId;
        if (locationChanged) {
            this.setState({ 
                listName: newListName, 
                listDescription: newListDesc
            })
        } else {
            return null;
        }
    }

    render() {
        const { listOwnerId, currentUserId } = this.props;

        return (
            <>
                {
                    listOwnerId === currentUserId &&
                    <div>
                        <div className='list-name'>
                            <input
                                type='text'
                                className="list-name-input"
                                value={this.state.listName}
                                onChange={this.updateListName}
                                onBlur={this.handleSubmit}
                                onKeyDown={this.onKeyDown}
                                onClick={e => e.stopPropagation()} />
                        </div>
                        <div className='list-description'>
                            <input
                                type='text'
                                className="list-description-input"
                                value={this.state.listDescription}
                                onChange={this.updateListDescription}
                                onBlur={this.handleSubmit}
                                onKeyDown={this.onKeyDown}
                                onClick={e => e.stopPropagation()} />
                        </div>
                    </div>
                }
            </>
        );
    }
}
export default withRouter(ListName);






