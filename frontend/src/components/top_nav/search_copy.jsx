import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import throttle from 'lodash/throttle';
import { fetchBooks } from '../../util/search_util';

export default function SearchBar2() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('Harry Potter');
  const [options, setOptions] = React.useState([]);

  const styles = theme => ({
    multilineColor: {
      color: 'white'
    }
  });

  const fetch = React.useMemo(
    () =>
      throttle((request) => {
        fetchBooks(request)
          .then(json => {
            return setOptions(Object
              .values(json.data)
              .map(book => {
                  return ({
                      id: book.id, 
                      volumeInfo: book.volumeInfo
                  })
              })
            )
          });
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch( inputValue , 
    //   (results) => {
    //   debugger
    //   if (active) {
    //     let newOptions = [];

    //     if (value) {
    //       newOptions = [value];
    //     }

    //     if (results) {
    //       newOptions = [...newOptions, ...results];
    //     }

    //     setOptions(newOptions);
    //   }
    // }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);


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
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) => {
        // will need to refactor this code once itemShow is ready
        return (
          typeof option.volumeInfo.title === 'string' ? option.id : null
        )
      }
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          InputProps={{
            ...params.InputProps,
            startAdornment: (
                <InputAdornment position='start'>
                    <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
            ),
          }}
          sx={{ input: { color: 'white' }}}
          // color='secondary'
          label="Search" 
          fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  sx={{ color: 'text.primary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body3" color="text.primary">
                  {option.volumeInfo.title}
                  {/* {authors(option.volumeInfo.authors)} */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* {option.volumeInfo.title} */}
                  {authors(option.volumeInfo.authors)}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}