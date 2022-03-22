import * as React from "react";
import './list_name.css';

class ListName extends React.Component {

    constructor(props) {
        super(props);
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
export default ListName;






