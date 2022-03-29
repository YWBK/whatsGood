import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import ItemsShowItem from "./items_show_item";
import { fetchSingleBook } from "../../util/search_util";
import { popularScore } from "../../util/book_api_util";
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
  const [popScore, setPopScore] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [myLists, setMyLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    fetchSingleBook(props.match.params.itemId).then((book) => {
      setItem(book.data);
    });
    const currentUserId = store.getState().session.user.id;
    popularScore(currentUserId, props.match.params.itemId).then((score) => {
      // debugger;
      setPopScore(parseInt(score.data));
    });
  }, [myLists, props.match.params.itemId]);

  const handleClickOpen = () => {
    // get global state from store.
    const state = store.getState();
    const currentUserId = state.session.user.id;
    const allLists = Object.values(state.entities.lists.all);
    const filteredLists = allLists.filter(
      (list) => list.ownerId === currentUserId
    );
    if (myLists.length === 0 && filteredLists.length > 0) {
      setMyLists(filteredLists);
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
    const listName = state.entities.lists.all[selectedList].name;
    setSnackBarMessage(listName);
    setSnackBarOpen(true);
  };

  return (
    <div className="items-show__container">
      <div className="items-show">
        <ItemsShowItem item={item} popScore={popScore} />
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
        <DialogTitle sx={{ bgcolor: "rgba(245,246,248,255)" }}>
          Add this book to my list
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "rgba(245,246,248,255)" }}>
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
                  <MenuItem key={list.id} value={list.id}>
                    {list.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "rgba(245,246,248,255)" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        // message="Successfully added to your list"
        message={`Successfully added to your ${snackBarMessage}`}
      />
    </div>
  );
};

export default ItemsShow;
