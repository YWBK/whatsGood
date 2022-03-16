import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import SideNavList from './side_nav_list';

const drawerWidth = 240;

export default function SideNav({ loggedIn, currentUserId, myLists, followingLists, followingUsers, fetchUser }) {
  
  React.useEffect(() => {
    fetchUser(currentUserId)
}, [currentUserId]);

  if (!loggedIn) return <div></div>
  if (!myLists) return <div></div>

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
        <SideNavList 
          className='side-nav-my-lists'
          formType={'my-lists'}
          currentUserId={currentUserId}
          list={myLists}
          fetchUser={fetchUser}
        />
        <Divider />
          <SideNavList 
            className='side-nav-following-lists'
            formType='following-lists'
            currentUserId={currentUserId}
            list={followingLists}
            fetchUser={fetchUser}
          />
        <Divider />
        <SideNavList 
          className='side-nav-following-users'
          formType='following-users'
          currentUserId={currentUserId}
          list={followingUsers}
          fetchUser={fetchUser}
        />
      </Box>
    </Drawer>
  );
}
