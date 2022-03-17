import React from 'react';
import BasicRating from './item_rate';
import ItemRate from './item_rate';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchSingleBook } from '../../util/search_util';

export default function ItemCompose(props) {
    const [itemRating, setItemRating] = React.useState(0);
    const [itemName, setItemName] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const volumeId = itemName;
        const listId = props.listId;
        const userId = props.userId;

        props.addItemToList(volumeId, listId, userId);
    }

    // to be replaced once we have % data from backend
    const updateRating = (rating) => {
        setItemRating(rating);
    }

    const updateName = (e) => {
        setItemName(e.target.value);
    }

    return (
        <div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Book volume id" variant="outlined"
                    value={itemName}
                    onChange={updateName} />

                {/* <Box sx={{ '& > legend': { mt: 2 }, }}>
                        <Typography component="legend">
                            Leave a rate
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={itemRating}
                            onChange={(event, newValue) => {
                                updateRating(newValue);
                            }}
                        />
                    </Box> */}

                <Button variant="contained" onClick={handleSubmit} >Add</Button>
            </div>
            <br />
        </div>
    )

}