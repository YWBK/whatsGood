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

export default function SideNav({ history, loggedIn, currentUserId, myLists, followingLists, followingUsers, fetchUser }) {
  React.useEffect(() => fetchUser(currentUserId), []);
  
  if (!loggedIn) return <div></div>
  if (!myLists) return <div></div>

  const handleClick = (id, type, e) => {
      e.preventDefault();
      switch(type) {
        case 'list':
          history.push(`/lists/${id}`);
          break;
        case 'user':
          history.push(`/users/${id}`);
          break;
        default:
            return null;
      };
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          // zIndex: -1,
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
          {myLists.map((list) => {
            if (!list) return null;
            return (
              <ListItem button onClick={e => handleClick(list.id, 'list', e)} key={list.id}>
                <ListItemText primary={`${list.name}`} />
              </ListItem>
            )
          }
          )}
        </List>
        <Divider />
        <List sx={{ height: 380, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>Following Lists</ListSubheader>
          {followingLists.map((list) => {
            if (!list) return null;
            return ( 
              <ListItem button onClick={e => handleClick(list.id, 'list', e)} key={list.id}>
                <ListItemText primary={`${list.name}`} secondary={`by ${list.ownerName}`} />
              </ListItem>
            )
          }
          )}
        </List>
        <Divider />
        <List sx={{ height: 450, overflow: "auto", paddingTop: 0 }}>
          <ListSubheader>Following Users</ListSubheader>
          {followingUsers.map((user) => {
            return (
              <ListItem button onClick={e => handleClick(user.id, 'user', e)} key={user.id}>
                <ListItemText primary={`${user.username}`} />
              </ListItem>
            )
          }
          )}
        </List>
      </Box>
    </Drawer>
  );
}
