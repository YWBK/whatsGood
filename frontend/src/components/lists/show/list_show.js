import React from "react";
import "./list_show.css";
import ListShowItem from "./list_show_item";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ItemCompose from "../../items/item_compose_container";
import ListItemSearch from "./list_item_search";
import Snackbar from "@mui/material/Snackbar";


class ListShow extends React.Component {
    constructor(props) {
        super(props);
        const listId = this.props.match.params.listId;
        // debugger

        this.state = {
            list: this.props.allLists[listId],
            snackOpen: false,
            listDeleteConfirmDialogOpen: false
        }
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.onDeleteList = this.onDeleteList.bind(this);
        this.handleDeleteConfirmDialogClose = this.handleDeleteConfirmDialogClose.bind(this);
    }

    componentWillMount() {
        const listId = this.props.match.params.listId;
        if (!this.props.allLists[listId]) {
            this.props.fetchList(listId);
        }
    }

    isMyList() {
        return this.state.list.ownerId === this.props.currentUserId;
    }
    handleSnackClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }


        this.setState({ snackOpen: false });
    }
    componentWillMount() {
        const listId = this.props.match.params.listId;
        if (!this.props.allLists[listId]) {
            this.props.fetchList(listId);
        }
    }

    componentDidMount() {
        this.props.fetchList(this.props.match.params.listId).then((list) => {
            this.setState({ list: list });
        });
    }

    // Called when component props changes.
    componentDidUpdate(prevProps) {
        const isLocationChanged =
            prevProps.match.params.listId !== this.props.match.params.listId;
        const listId = this.props.match.params.listId;
        const getListContent = async () => {
            if (isLocationChanged) {
                await this.props.fetchList(listId);
            }
            if (!this.state.list || isLocationChanged) {
                this.setState({ list: this.props.allLists[listId] });
            }
        };
        getListContent();
    }

    onDeleteList() {
        const userId = this.state.list.ownerId;
        this.props.removeList(this.props.match.params.listId, userId);
        this.props.history.push(`/users/${userId}`);
    }

    handleDeleteConfirmDialogClose() {
        this.setState({ listDeleteConfirmDialogOpen: false });
    }

    render() {
        return <>
            {
                this.state.list && (
                    <div className="list-outer-box">
                        <div className='list-inner-box'>
                            <div className='list-info'>
                                <div className='list-info-left'>
                                    <h2>{this.state.list.name}</h2>
                                    <div className='list-show-des'>
                                        {this.state.list.description}
                                    </div>
                                    <div className='list-show-author'>
                                        {(this.state.list.owner && this.state.list.owner.username) ? `by ${this.state.list.owner.username}` : ""
                                        }
                                    </div>
                                </div>
                                <div className='list-info-right'>
                                    {this.isMyList() && <Button
                                        onClick={() => {
                                            this.setState({ listDeleteConfirmDialogOpen: true })
                                        }}
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>}
                                </div>
                            </div>
                            <div>
                                {this.state.list.bookItems.map(book => (
                                    <ListShowItem
                                        book={book}
                                        key={book._id}
                                        listId={this.state.id}
                                        removeBookFromList={
                                            () => {
                                                this.props.removeItemFromList(
                                                    this.state.list.ownerId,
                                                    book._id,
                                                    this.props.match.params.listId
                                                );
                                                this.setState({ snackOpen: true });
                                            }
                                        } />
                                ))}
                            </div>
                            <div>
                                {
                                    this.isMyList() && <ListItemSearch
                                        userId={this.state.list.ownerId}
                                        addItem={this.props.addItemToList} />
                                }
                            </div>

                        </div>

                        <Dialog
                            open={this.state.listDeleteConfirmDialogOpen}
                            onClose={this.handleDeleteConfirmDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`Do you want to delete ${this.state.list.name}?`}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You won't be able to restore this once deleted.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDeleteConfirmDialogClose}>Cancel</Button>
                                <Button onClick={this.onDeleteList} autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            }
        </>
    }


}

export default ListShow;
