import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import SideNavList from "./side_nav_list";

const drawerWidth = 240;

export default function SideNav({
  loggedIn,
  currentUserId,
  myLists,
  followingLists,
  followingUsers,
  myListIds,
  followingListIds,
  followingUserIds,
  fetchUser,
  fetchList,
  addList,
}) {
  React.useEffect(() => {
    const getNavContent = async () => {
      await fetchUser(currentUserId);
      return;
    };
    getNavContent();
  }, [fetchUser, currentUserId]);

  if (!loggedIn) return <div></div>;
  if (!myLists) return <div></div>;

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
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "space-evenly", 
          height: "100vh",
          }}
        
      >
        <SideNavList
          className="side-nav-my-lists"
          formType={"my-lists"}
          currentUserId={currentUserId}
          list={myLists}
          listIds={myListIds}
          fetch={fetchList}
          addList={addList}
        />
        <Divider />
        <SideNavList
          className="side-nav-following-lists"
          formType="following-lists"
          currentUserId={currentUserId}
          list={followingLists}
          listIds={followingListIds}
          fetch={fetchList}
        />
        <Divider />
        <SideNavList
          className="side-nav-following-users"
          formType="following-users"
          currentUserId={currentUserId}
          list={followingUsers}
          listIds={followingUserIds}
          fetch={fetchUser}
        />
      </Box>
    </Drawer>
  );
}
