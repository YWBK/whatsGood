import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SettingsBtn from "./settings_btn";
import { Link } from "react-router-dom";
import "./top_nav.css";
// import SearchBar from './search';
import SearchBar2 from "./search_copy";

const TopNavMain = ({ loggedIn, logout, currUserId }) => {
  return (
    <div className="top-nav-main__container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between", minHeight: '8vh' }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={"/"}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  >
                    <img src="/logo_orange.png" alt="logo" height="50" />
                  </Typography>
                </IconButton>
              </Link>
              <SearchBar2 />
            </div>
            <SettingsBtn logout={logout} currUserId={currUserId} />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default TopNavMain;
