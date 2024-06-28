// src/components/HamburgerMenu.tsx
import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createNewAndStartConversation, disconnectSocket } from '../features/conversationSlice';
import { useAppDispatch } from '../store/hooks';

const ConversationMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnectClick = () => {
    handleClose();
    dispatch(disconnectSocket());
  };

  const handleNewChatClick = () => {
    handleClose();
    dispatch(createNewAndStartConversation('', false));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        edge="end"
        color="primary"
        aria-label="menu"
        onClick={handleClick}
        sx={{ margin: '0 5px 0 5px' }}
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        color="primary"
      >
        <MenuItem onClick={handleNewChatClick}>New Chat</MenuItem>
        <MenuItem onClick={handleDisconnectClick}>Disconnect</MenuItem>
      </Menu>
    </div>
  );
};

export default ConversationMenu;
