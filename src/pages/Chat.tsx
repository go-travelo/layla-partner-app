import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectConnectionConversationId, selectConnectionStatus, selectConversation } from '../features/conversationSlice';
import Message from '../components/Message';
import TypingMessage from '../components/TypingMessage';
import SendChatMessage from '../components/SendChatMessage';
import ChatConnectionForm from '../components/ChatConnectionForm';

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const connectionStatus = useAppSelector(selectConnectionStatus);
  const conversation = useAppSelector(selectConversation);
  const conversationId = useAppSelector(selectConnectionConversationId);

  const messages = conversation.chatMessages || [];
  const lastMessageText = messages[messages.length - 1]?.text;

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    }), 200);
  };

  useEffect(() => {
    scrollToBottom();
  }, [lastMessageText, messageContainerRef.current?.scrollHeight]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {connectionStatus !== 'connected' && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <ChatConnectionForm/>
        </Box>
      )}

      <Box flexGrow={1} overflow="auto" ref={messageContainerRef} p={2} sx={{ marginTop: '64px' }}>
        {messages.map((message) => (
          <Message key={message.id} message={message}/>
        ))}
        {conversation.isProcessing && <TypingMessage/>}
      </Box>

      {connectionStatus === 'connected' && <SendChatMessage/>}
    </Box>
  );
};

export default Chat;
