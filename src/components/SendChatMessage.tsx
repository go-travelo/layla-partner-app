import React, { useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectConnectionConversationId, selectConnectionToken, sendMessage } from '../features/conversationSlice';

const SendChatMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const conversationId = useAppSelector(selectConnectionConversationId);
  const token = useAppSelector(selectConnectionToken);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      dispatch(sendMessage({ token, conversationId, text: messageText }));
      setMessageText('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ flex: '0 0 auto', padding: '0px 14px 3px 14px', bgcolor: 'background.paper', boxShadow: 1 }}>
      <TextField
        fullWidth
        placeholder="Ask anything..."
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSendMessage} color="primary" disabled={!messageText}>
                <SendIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SendChatMessage;
