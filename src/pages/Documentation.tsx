import React from 'react';
import { Box, Container, Divider, Link, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

const CodeBlock = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflowX: 'auto',
  '& code': {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
}));

const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
}));

const Documentation = () => {
  return (
    <StyledContainer maxWidth="md">
      <SectionTitle variant="h5">
        Layla Documentation
      </SectionTitle>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          About Layla
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            Layla is an AI-powered travel agent offering personalized trip planning and booking services. It uses advanced AI to help you discover destinations, create custom itineraries, and book hotels and flights.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            Our platform utilizes both REST API and WebSocket (via Socket.io) to power real-time chat functionality and expose various features.
          </Typography>
        </Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Contact Information:
        </Typography>
        <List dense>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Link href="mailto:contact@beautifuldestinations.app">
                  contact@beautifuldestinations.app
                </Link>
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Link href="https://www.enterprise.justasklayla.com/" target="_blank" rel="noopener">
                  Enterprise JustAskLayla
                </Link>
              }
            />
          </ListItem>
        </List>
      </StyledPaper>

      <SectionTitle variant="h5">
        Layla Partner API
      </SectionTitle>
      <StyledPaper elevation={3}>
        <Box mb={2}>
          <Typography variant="body1">
            The Layla Partner API grants access to Layla's core functionalities, including conversations, activities, hotels, and flights. It features a RESTful interface using JSON format, with security ensured through SSL and API access tokens.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }}/>
        <Box mb={2}>
          <Typography variant="body1">
            For comprehensive API details, refer to our:
          </Typography>
        </Box>
        <Link
          href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui"
          target="_blank"
          rel="noopener"
          variant="button"
          sx={{ display: 'inline-block', mb: 4 }}
        >
          Swagger / OpenAPI Documentation
        </Link>
      </StyledPaper>

      <SectionTitle variant="h5">
        WebSocket Communication
      </SectionTitle>
      <StyledPaper elevation={3}>
        <Box mb={2}>
          <Typography variant="body1">
            Layla employs WebSocket technology (via Socket.IO) for real-time conversation streaming. Here's a guide to establishing and using the WebSocket connection:
          </Typography>
        </Box>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Connecting to Socket.IO:
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            Utilize a Socket.IO client (V3 or higher) with these settings:
          </Typography>
        </Box>
        <CodeBlock>
          <code>
            {`URL: https://bd-api.dev.beautifuldestinations.app

Options:
{
  "path": "/chatbot/socket.io",
  "query": {"conversationId": "<conversationId>"},
  "forceNew": true,
  "transports": ["websocket"],
  "auth": { "token": "<userAuthToken>" }
}`}
          </code>
        </CodeBlock>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          Server-to-Client Events:
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            The server emits two types of events:
          </Typography>
        </Box>

        <ul>
          <li><Box>
            <Typography variant="body1"><InlineCode>conversation</InlineCode> event</Typography>
            Content: <InlineCode>{'{ conversationId: string; patch: Operation[] }'}</InlineCode>
            <div>
              Contains conversation patch messages for real-time updates.
            </div>
          </Box></li>

          <li><Box>
            <Typography variant="body1"><InlineCode>error</InlineCode> event</Typography>
            Content: <InlineCode>{'{ error: string, reconnect: boolean }'}</InlineCode>
            <div>
              Carries error messages. The 'reconnect' flag suggests whether to attempt reconnection.
            </div>
          </Box>
          </li>
        </ul>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          JSON Patch Operations:
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            The <InlineCode>conversation</InlineCode> event utilizes JSON Patch operations (as per RFC 6902) to describe conversation changes. These operations enable real-time construction and updating of conversations.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">
            We suggest using libraries for applying JSON Patch operations. For JavaScript, we recommend the <Link href="https://www.npmjs.com/package/fast-json-patch" target="_blank" rel="noopener">fast-json-patch</Link> library.
          </Typography>
        </Box>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          Testing Tools:
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            To test WebSocket connections, we recommend the <Link href="https://amritb.github.io/socketio-client-tool/" target="_blank" rel="noopener">Socket.IO testing tool</Link>.
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Documentation;