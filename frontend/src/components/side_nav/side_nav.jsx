import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListSubheader from "@mui/material/ListSubheader";

const drawerWidth = 240;

export default function SideNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          zIndex: -1,
          overflow: "auto"
        },
      }}
    >
      <Toolbar />
      <Box>
        <List sx={{ maxHeight: 240, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>My Lists</ListSubheader>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={`My List ${text}`} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ maxHeight: 250, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>Following Lists</ListSubheader>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={`Following List ${text}`} />
            </ListItem>
          ))}
        </List>
        <List sx={{ maxHeight: 250, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>Following Users</ListSubheader>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={`Following User ${text}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
