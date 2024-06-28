import React, { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { connectSocket, disconnectSocket, selectConnectionConversationId, selectConnectionError, selectConnectionStatus, selectConnectionToken, selectConnectionUrl, selectConversation, sendMessage, setConnectionConversationId, setConnectionToken, setConnectionUrl } from '../features/conversationSlice';
import Message from '../components/Message';

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const connectionStatus = useAppSelector(selectConnectionStatus);
  const connectionError = useAppSelector(selectConnectionError);
  const conversation = useAppSelector(selectConversation);
  const url = useAppSelector(selectConnectionUrl);
  const conversationId = useAppSelector(selectConnectionConversationId);
  const token = useAppSelector(selectConnectionToken);
  const [messageText, setMessageText] = useState('');

  const messages = conversation.chatMessages || [];

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleConnect = () => {
    if (connectionStatus === 'connected') {
      dispatch(disconnectSocket());
    } else if (connectionStatus === 'disconnected') {
      dispatch(connectSocket(url, conversationId, token));
    }
  };

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
    <Box display="flex" flexDirection="column" height="100vh">
      {connectionStatus !== 'connected' && (
        <Box p={2} sx={{ flex: '0 0 auto', marginTop: '80px' }}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="URL"
              value={url}
              onChange={e => dispatch(setConnectionUrl(e.target.value))}
              sx={{ mb: 2 }}
            />
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
      )}
      <Box flexGrow={1} overflow="auto" ref={messageContainerRef} p={2} sx={{ marginTop: '64px' }}>
        {messages.map((message) => (
          <Message key={message.id} message={message}/>
        ))}
      </Box>
      {connectionStatus === 'connected' && (
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
      )}
    </Box>
  );
};

export default Chat;
