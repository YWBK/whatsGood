import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ModalForm from '../modal/modal';


const drawerWidth = 240;

export default function SideNav({ loggedIn, currentUserId, userLists, followingLists, followingUsers, fetchUser }) {
  React.useEffect(() => fetchUser(currentUserId), []);
  
  if (!loggedIn) return <div></div>

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
          overflow: "hidden",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <List
          sx={{ maxHeight: "max-content", overflow: "auto", paddingTop: 0 }}
        >
          <ListSubheader sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>My Lists</span>
            <ModalForm />
          </ListSubheader>
          {userLists.map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={`${text}`} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ height: 380, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>Following Lists</ListSubheader>
          {followingLists.map((list) => (
            <ListItem button key={list}>
              <ListItemText primary={`${list}`} /> {/* will need to update to present list Name and owne*/}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ height: 450, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>Following Users</ListSubheader>
          {followingUsers.map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={`${text}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
