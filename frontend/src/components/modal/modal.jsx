import * as React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { withRouter } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // borderRadius: '4%'
  };

function ModalForm({ currentUserId, addList, history }) {
    const [open, setOpen] = React.useState(false);
    const [listName, setListName] = React.useState('');
    const [listDescription, setListDescription] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleClick = (e) => {
        e.preventDefault();
        const owner = currentUserId;
        const name = listName;
        const description = listDescription;
        const newList = {
            owner: owner,
            name: name,
            description, description
        }
        const makeList = async () => {
            const res = await addList(newList);
            const id = res.list.data.id;
            history.push({
                pathname: `/lists/${id}`
            })
            handleClose();
        }
        makeList();
    }

    const handleChange = (field, e) => {
        e.preventDefault();
        field(e.target.value);
        // setListName(e.target.value);
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add List </Button>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}>
                <Fade in={open}>
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add List
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label='New List Name'
                                variant='standard'
                                value={listName}
                                onChange={ e => handleChange(setListName, e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label='List Description'
                                variant='standard'
                                value={listDescription}
                                onChange={e => handleChange(setListDescription, e)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') handleClick(e)
                                }}
                            />
                        </Grid>
                        <Grid container justifyContent='flex-end' item xs={9}>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid container justifyContent='flex-end' item xs={3}>
                            <Button onClick={handleClick}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default withRouter(ModalForm);