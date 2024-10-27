// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import '../App.css'

const Header = ({ username }) => {

  
  return (
    <AppBar  position="static" className="MuiAppBar-root" >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>  
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        </Typography>


        {/* Display the username beside the logout button */}
        {username && (
          <Typography variant="body1" style={{ marginRight: '16px' }}>
            {username}
          </Typography>
        )}

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
