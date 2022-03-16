// import React from 'react';

// class ItemRate extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h3>{this.props.rate}</h3>
//             </div>
//         );
//     }
// }

// export default ItemRate;




import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
    const [value, setValue] = React.useState(0);

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Leave a rate</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
}