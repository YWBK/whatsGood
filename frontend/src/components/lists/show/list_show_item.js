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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './list_show_item.css';

class ListShowItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: null
        };
        this.onDelete = this.onDelete.bind(this);

    }

    componentDidMount() {
        const { volumeId } = this.props.book;
        fetchSingleBook(volumeId).then(res => {
            this.setState({ book: res.data });
        });
    }

    onDelete() {
        this.props.removeBookFromList();
    }

    render() {
        const { book } = this.props;

        return (
            <>
                {
                    this.state.book &&
                    <div className="book-row">
                        <Link
                            to={`/items/${book.volumeId}`}
                        // target="_blank"
                        >
                            <AlignItemsList book={this.state.book.volumeInfo} />
                        </Link>

                        <div>
                            <IconButton
                                sx={{ marginLeft: 10, marginTop: 3 }}
                                aria-label="delete"
                                size='large'
                                onClick={this.onDelete}>
                                <DeleteIcon />
                            </IconButton>
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
            <ListItem alignItems="flex-start" sx={{ width: 500 }}>
                <ListItemAvatar>
                    <Avatar alt="Book1" src={`${props.book.imageLinks.thumbnail}`} />
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
                            {`by ${props.book.authors.map(author => `${author}`)}`}

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



