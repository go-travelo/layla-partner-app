import React from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { connectSocket, disconnectSocket, selectConnectionConversationId, selectConnectionError, selectConnectionStatus, selectConnectionToken, setConnectionConversationId, setConnectionToken } from '../features/conversationSlice';
import { selectBaseApiUrl } from '../features/settingsSlice';

const ChatConnectionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const connectionStatus = useAppSelector(selectConnectionStatus);
  const connectionError = useAppSelector(selectConnectionError);
  const url = useAppSelector(selectBaseApiUrl);
  const conversationId = useAppSelector(selectConnectionConversationId);
  const token = useAppSelector(selectConnectionToken);

  const handleConnect = () => {
    if (connectionStatus === 'connected') {
      dispatch(disconnectSocket());
    } else if (connectionStatus === 'disconnected') {
      dispatch(connectSocket(url, conversationId, token));
    }
  };

  let buttonText = 'Connect';
  switch (connectionStatus) {
    case 'connecting':
      buttonText = 'Connecting...';
      break;
    case 'connected':
      buttonText = 'Disconnect';
      break;
    case 'disconnected':
      buttonText = 'Connect';
      break;
  }

  return (
    <Box p={2} width="100%" maxWidth="600px">
      <Box mb={2}>
        <TextField
          fullWidth
          label="Conversation ID"
          value={conversationId}
          onChange={e => dispatch(setConnectionConversationId(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Token"
          value={token}
          onChange={e => dispatch(setConnectionToken(e.target.value))}
          sx={{ mb: 2 }}
        />
      </Box>
      <Button variant="contained" onClick={handleConnect} sx={{ marginBottom: 1 }}>
        {buttonText}
      </Button>
      {connectionError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error: {connectionError}
        </Alert>
      )}
    </Box>
  );
};

export default ChatConnectionForm;
