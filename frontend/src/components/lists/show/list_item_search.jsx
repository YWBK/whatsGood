import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import debounce from 'lodash/debounce';
import { fetchBooks } from '../../../util/search_util';
import { withRouter } from 'react-router-dom';

function ListItemSearch({ userId, addItem, match }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  // const styles = theme => ({
  //   multilineColor: {
  //     color: 'white'
  //   }
  // });

  const fetch = React.useMemo(
    () =>
      debounce((request) => {
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

    fetch(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

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
          typeof option.id === 'string' ? option.volumeInfo.title : ''
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
        if (newValue) {
          const volumeId = newValue.id;
          const listId = match.params.listId;
          const ownerId = userId;
          addItem(volumeId, listId, ownerId);
        }
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          sx={{ input: { color: 'text.primary' }}}
          label="Add Item" 
          fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id} >
            <Grid container alignItems="center" >
              <Grid item >
                <Box
                  sx={{ color: 'text.primary', mr: 2 }}
                />
              </Grid>
              <Grid item xs >
                <Typography variant="body3" color="text.primary">
                  {option.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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

export default withRouter(ListItemSearch);
