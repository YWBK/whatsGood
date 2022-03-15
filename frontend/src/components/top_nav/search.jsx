import * as React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import { Box } from '@mui/system';
import { fetchBooks } from '../../util/search_util';

function SearchBar () {
    const [ jsonResults, setJsonResults ] = React.useState([]);
    const [ inputValue, setInputValue ] = React.useState('harry potter');
    const [ searchTimeout, setSearchTimeout ] = React.useState(0);

    React.useEffect(() => {
        fetchBooks(inputValue)
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
    }, [inputValue]);

    const handleInput = e => {

        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }

        setSearchTimeout( setTimeout( () => {
            setInputValue(e.target.value);
        }, 1000))

    };

    const authors = (authors) => {
        let authorsResult = '';
        if (!authors) return null;
        authors.map((author, i) => {
            if (i === 0) {
                authorsResult += ' by ' + author;
            } else if (i === authors.length - 1) {
                authorsResult += ', & ' + author;
            } else {
                authorsResult += ', ' + author;
            }
        });
        return authorsResult;
    } 

    return (
        <Stack sx={{width: 300}}>
            <Autocomplete 
                id='search'
                sx={{width: 300}}
                getOptionLabel={(jsonResults) => `${jsonResults.volumeInfo.title}`}
                options={jsonResults}
                isOptionEqualToValue={(option, value) => option.id === value.id
                }
                noOptionsText={'None found'}
                renderOption={(props, jsonResults) => (
                    <Box component='li' {...props} key={jsonResults.id}>
                        {jsonResults.volumeInfo.title} 
                        {authors(jsonResults.volumeInfo.authors)}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        label='Search for a Book'
                        variant='standard' 
                        onChange={handleInput}
                    />
                )}
            />
        </Stack>
    )
}

export default SearchBar;


