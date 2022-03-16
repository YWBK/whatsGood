import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';

export default function BasicRating() {
    const [value, setValue] = React.useState(2);

    return (
        <Box
            sx={{
                // rating is to be updated
                '& > legend': { mt: 2 },
            }}
        >
            <Rating name="read-only" value={value} readOnly />
        </Box>
    );
}
