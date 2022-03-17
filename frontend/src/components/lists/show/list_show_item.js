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


class ListShowItem extends React.Component {

    constructor() {
        super();
        this.state = { book: null };
    }

    componentDidMount() {
        const { volumeId } = this.props.book;
        fetchSingleBook(volumeId).then(res => {
            this.setState({ book: res.data });
        });
    }

    render() {
        const { book } = this.props;

        return (
            <>
                {
                    this.state.book && <Link
                        to={`/items/${book.volumeId}`}
                    // target="_blank"
                    >
                        <AlignItemsList book={this.state.book.volumeInfo} />
                    </Link>
                }
            </>
        );
    }
}
export default ListShowItem;

function AlignItemsList(props) {
    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
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
                <BasicRating book={props.book} />
            </ListItem>

            <Divider variant="inset" component="li" />

        </List>
    );
}



