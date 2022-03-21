import { Link } from "react-router-dom";
import * as React from "react";
import { fetchSingleBook } from "../../../util/search_util";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import BasicRating from "./rating"
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './list_show_item.css';

class ListShowItem extends React.Component {

    constructor() {
        super();
        this.state = { book: null };
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        const { volumeId } = this.props.book;
        fetchSingleBook(volumeId).then(res => {
            this.setState({ book: res.data });
        });
    }

    onDelete() {
        const { removeBookFromList } = this.props;
        removeBookFromList();
    }

    render() {
        const { book } = this.props;
        const { listOwnerId, currentUserId } = this.props;

        return (
            <>
                {
                    this.state.book &&
                    <div className="book-row">
                        <Link
                            to={`/items/${book.volumeId}`}
                        >
                            <AlignItemsList book={this.state.book.volumeInfo} />
                        </Link>

                        <div>
                            {listOwnerId === currentUserId &&
                                <IconButton
                                    sx={{ marginTop: 3 }}
                                    aria-label="delete"
                                    size='large'
                                    onClick={this.onDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </div>
                    </div>
                }
            </>
        );
    }
}
export default ListShowItem;

function AlignItemsList(props) {
    return (
        <List sx={{ width: "100%" }}>
            <ListItem alignItems="flex-start" sx={{ minWidth: 300, width: 400 }}>
                <ListItemAvatar>
                    <Avatar alt="Book1" variant="square"
                        sx={{ width: 45, height: 60, marginRight: 5 }}
                        src={`${props.book.imageLinks.thumbnail}`} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${props.book.title}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {`${props.book.subtitle}`}
                            </Typography>
                            <br />
                            {`by ${props.book.authors.map(author => `${author} `)}`}

                        </React.Fragment>
                    }
                />
                {/* <div className="percentage-box">
                    <div className="percentage-inner-box">
                        <div className="percentage-number">90%</div>
                        <div><ThumbUpIcon fontSize='large' /></div>
                    </div>
                </div> */}

            </ListItem>

            <Divider variant="fullWidth" component="li" />

        </List >
    );
}



