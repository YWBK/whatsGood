import * as React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import { fetchBooks } from '../../util/search_util';

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SettingsBtn from "./settings_btn";
import { Link } from "react-router-dom";

function SearchBar () {
    const [ jsonResults, setJsonResults ] = React.useState([]);
    const [ searchStr, updateSearchStr ] = React.useState('potter');

    React.useEffect(() => {
        // debugger
        fetchBooks(searchStr)
            .then(json => {
                return setJsonResults(Object
                    .values(json.data)
                    .map(book => {
                        return ({
                            id: book.id, 
                            volumeInfo: book.volumeInfo
                        })
                    })
                )
            });
    }, []);

    return (
        <Stack sx={{width: 300}}>
            <Autocomplete 
                id='search'
                getOptionLabel={(jsonResults) => `${jsonResults.volumeInfo.title}`}
                options={jsonResults}
                sx={{width: 300}}
                isOptionEqualToValue={(option, value) => 
                    option.volumeInfo.title === value.volumeInfo.title
                }
                onChange={ e => {
                    debugger
                    updateSearchStr(e.target.value)} }
                noOptionsText={'None found'}
                renderOption={(props, jsonResults) => (
                    <Box component='li' {...props} key={jsonResults.id}>
                        {jsonResults.volumeInfo.title}
                    </Box>
                )}
                renderInput={(params) => {
                    // debugger
                    return (<TextField {...params} label='Search for a Book'/>)
                }
                }
            />
        </Stack>
    )
    // console.log(json.esult)
}

export default SearchBar;