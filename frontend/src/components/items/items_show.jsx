import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import ItemsShowItem from "./items_show_item";
import { fetchSingleBook } from "../../util/search_util";
import Button from "@mui/material/Button";
import "./items_show.css";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addItemToList } from "../../actions/item_actions";
import Snackbar from "@mui/material/Snackbar";

const ItemsShow = (props) => {
  // get redux store
  const store = useStore();
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [myLists, setMyLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");

  useEffect(() => {
    fetchSingleBook(props.match.params.itemId).then((book) => {
      setItem(book.data);
    });
  }, [myLists, props.match.params.itemId]);

  const handleClickOpen = () => {
    // get global state from store.
    const state = store.getState();
    const myListIds = state.session.user.myLists;
    if (myLists.length === 0 && myListIds.length > 0) {
      const lists = [];
      myListIds.forEach((id) => lists.push(state.entities.lists.all[id]));
      console.log("setting state list");
      setMyLists(lists);
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleListSelected = (e) => {
    const listId = e.target.value;
    setSelectedList(listId);
  };

  const handleAdd = () => {
    const state = store.getState();
    // similar to mdtp
    store.dispatch(
      addItemToList(
        props.match.params.itemId,
        selectedList,
        state.session.user.id
      )
    );
    handleClose();
    setSnackBarOpen(true);
  };

  return (
    <div className="items-show__container">
      <div className="items-show">
        <ItemsShowItem item={item} />
        <Button
          variant="contained"
          sx={{ marginTop: "2em", width: "max-content" }}
          size="medium"
          onClick={handleClickOpen}
        >
          Add to list
        </Button>
      </div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add this book to my list</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-dialog-select-label">List</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedList}
                onChange={handleListSelected}
                input={<OutlinedInput label="List" />}
              >
                {myLists.map((list) => (
                  <MenuItem value={list.id}>{list.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message="Successfully added to your list"
      />
    </div>
  );
};

export default ItemsShow;
