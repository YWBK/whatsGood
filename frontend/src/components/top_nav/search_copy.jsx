import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import throttle from 'lodash/throttle';
import { fetchBooksAndUsers } from '../../util/search_util';
import { withRouter } from 'react-router-dom';

function SearchBar2({ history }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('Harry Potter');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request) => {
        fetchBooksAndUsers(request)
          .then(json => {
            return setOptions(Object
              .values(json.data)
              .reverse()
              .flat()
              .map((res) => {
                if (res.volumeInfo) {
                  return ({
                    id: res.id,
                    volumeInfo: res.volumeInfo
                  });
                } else if (res.username) {
                  return ({
                    id: res._id,
                    username: res.username
                  });
                } else {
                  return null;
                }
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
    );

    return () => {
      active = false;
      setValue(null);
      setInputValue('');
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
      id="top-search"
      sx={{ width: 300 }}
      getOptionLabel={(option) => {
        return (
          typeof option.id === 'string' ? option.id : null
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
        if (newValue.username) {
          history.push({
            pathname: `/users/${newValue.id}`
          })
        } else if (newValue.volumeInfo) {
          history.push({
            pathname: `/items/${newValue.id}`
          })
        }
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
          sx={{ input: { color: 'white' } }}
          label="Search" 
          fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          // <li {...props} key={option.id} >
          <li {...props} key={option.id} >
            <Grid container alignItems="center" sx={{backgroundColor: '#F5F1E0' }}>
              <Grid item >
                <Box
                  sx={{ color: 'text.primary', mr: 2 }}
                />
              </Grid>
              <Grid item xs >
                <Typography variant="body3" color="text.primary">
                  {option.volumeInfo ? option.volumeInfo.title : (option.username ? option.username : null)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.volumeInfo ? authors(option.volumeInfo.authors) : null }
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default withRouter(SearchBar2);