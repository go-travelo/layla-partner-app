import React from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} sx={{ color: 'secondary.main' }}>
        <MenuIcon/>
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{ '& .MuiDrawer-paper': { backgroundColor: 'primary.main', color: 'secondary.main' } }}
      >
        <List>
          <ListItemButton
            component={Link}
            to="/"
            onClick={toggleDrawer}
            sx={buttonStyle}
          >
            <ListItemIcon sx={{ color: 'secondary.main' }}>
              <InfoIcon/>
            </ListItemIcon>
            <ListItemText primary="Documentation"/>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/chat"
            onClick={toggleDrawer}
            sx={buttonStyle}
          >
            <ListItemIcon sx={{ color: 'secondary.main' }}>
              <ChatIcon/>
            </ListItemIcon>
            <ListItemText primary="Chat"/>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/users"
            onClick={toggleDrawer}
            sx={buttonStyle}
          >
            <ListItemIcon sx={{ color: 'secondary.main' }}>
              <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Users"/>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/settings"
            onClick={toggleDrawer}
            sx={buttonStyle}
          >
            <ListItemIcon sx={{ color: 'secondary.main' }}>
              <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Settings"/>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;