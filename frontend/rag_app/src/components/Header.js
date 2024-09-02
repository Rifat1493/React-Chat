// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>  
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/logout">
          Logout
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
