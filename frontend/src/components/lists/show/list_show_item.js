import { Link } from "react-router-dom";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import BasicRating from "./rating"


class ListShowItem extends React.Component {

    render() {
        const { book } = this.props;
        return (
            <Link
                to={`/items/${book._id}`}
            // target="_blank"
            >
                <AlignItemsList book={book} />
            </Link>
        );
    }
}
export default ListShowItem;



function AlignItemsList(props) {
    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Book1" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={`${props.book._id}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Book Description
                            </Typography>
                            {" — This is a book about…"}
                            {`${props.book.volumeId}`}
                            <BasicRating book={props.book} />
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />

        </List>
    );
}



