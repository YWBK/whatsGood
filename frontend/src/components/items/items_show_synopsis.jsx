import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: 'rgba(245,246,248,255)',
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ItemsShowSynopsis({synopsis}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const parse = require("html-react-parser");
  const description = parse(synopsis);

//   debugger;

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        Synopsis
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="items-show-item__synopsis">{description}</div>
        </Box>
      </Modal>
    </div>
  );
}
