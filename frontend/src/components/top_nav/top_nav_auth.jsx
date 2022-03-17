import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import "./top_nav.css";

const TopNavAuth = () => {
  return (
    <div className="top-nav-auth__container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link to="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  {/* logo pending */}
                  wG
                </Typography>
              </IconButton>
            </Link>
            <Link to="/signup">
              <Button color="inherit">Login / Sign Up</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default TopNavAuth;
