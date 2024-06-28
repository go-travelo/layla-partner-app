import React from 'react';
import { Alert, Box, Button, Divider, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { connectSocket, disconnectSocket, selectConnectionConversationId, selectConnectionError, selectConnectionStatus, selectConnectionToken, selectConnectionUrl, selectConversation, setConnectionConversationId, setConnectionToken, setConnectionUrl } from '../features/conversationSlice';
import Message from '../components/Message';

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const connectionStatus = useAppSelector(selectConnectionStatus);
  const connectionError = useAppSelector(selectConnectionError);
  const conversation = useAppSelector(selectConversation);
  const url = useAppSelector(selectConnectionUrl);
  const conversationId = useAppSelector(selectConnectionConversationId);
  const token = useAppSelector(selectConnectionToken);

  const messages = conversation.chatMessages || [];

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
    <Box p={2}>
      <Box mb={2}>
        <TextField
          fullWidth
          label="URL"
          value={url}
          onChange={e => dispatch(setConnectionUrl(e.target.value))}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Conversation ID"
          value={conversationId}
          onChange={e => dispatch(setConnectionConversationId(e.target.value))}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Token"
          value={token}
          onChange={e => dispatch(setConnectionToken(e.target.value))}
          margin="normal"
        />
      </Box>
      <Button variant="contained" onClick={handleConnect}>
        {buttonText}
      </Button>
      {connectionError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error: {connectionError}
        </Alert>
      )}
      <Divider sx={{ margin: '30px 0 30px 0' }}/>

      {messages.map((message) => (
        <Message key={message.id} message={message}/>
      ))}
    </Box>
  );
};

export default Chat;
