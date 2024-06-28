import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ borderRadius: 0 }}>
      <Toolbar>
        <Sidebar/>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/layla192.jpg`}
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginRight: '10px',
              marginLeft: '10px',
              border: '2px solid white', // Soft white rounded border
            }}
          />
          <Typography variant="h6" noWrap sx={{ color: 'secondary.main' }}>
            Layla - Partner Portal
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
