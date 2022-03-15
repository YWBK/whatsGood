import React from 'react';

class ListShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myList: []
        }
    }

    componentWillMount() {
        this.props.fetchUserList(this.props.match.params.listId);
    }

    componentWillReceiveProps(newState) {
        this.setState({ myList: newState.myList });
    }

    render() {
        if (this.state.userLists.length === 0) {
            return (<div>
                You don't have any list items yet.</div>)
        } else {
            return (
                <div>
                    <h2>Your List Items</h2>
                    {/* {this.state.userList.map(listItem => (
                        // <ListItem key={listItem._id} text={listItem.text} />
                    ))} */}
                </div>
            );
        }
    }
}

export default ListShow;