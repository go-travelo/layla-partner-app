import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ChatMessage } from '../features/conversationSliceModels';

const StyledMessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUserMessage',
})<{ isUserMessage: boolean }>(({ isUserMessage }) => ({
  display: 'flex',
  justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
  margin: '8px 0',
}));

const StyledMessageBox = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isUserMessage',
})<{ isUserMessage: boolean }>(({ isUserMessage, theme }) => ({
  padding: '10px 16px',
  maxWidth: '60%',
  backgroundColor: isUserMessage ? theme.palette.primary.main : theme.palette.secondary.main,
  color: isUserMessage ? theme.palette.secondary.main : theme.palette.text.primary,
}));

const Message: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <StyledMessageContainer isUserMessage={message.isUserMessage}>
      <StyledMessageBox isUserMessage={message.isUserMessage}>
        <Typography variant="body1">{message.text}</Typography>
      </StyledMessageBox>
    </StyledMessageContainer>
  );
};

export default Message;