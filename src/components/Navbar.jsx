import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Store
        </Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Home</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
