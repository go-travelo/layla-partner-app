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
            Our platform utilizes both <Link href="https://en.wikipedia.org/wiki/REST" target="_blank" rel="noopener">REST API
          </Link> and <Link href="https://en.wikipedia.org/wiki/WebSocket" target="_blank" rel="noopener">WebSocket
          </Link> (via <Link href="https://socket.io/" target="_blank" rel="noopener">Socket.io
          </Link>) to power real-time chat functionality and expose various features.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }}/>
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
          <Box mb={2}>
            <Typography variant="body1">
              The Layla Partner API grants access to Layla's core functionalities, including conversations, activities, hotels, and flights. It features a RESTful interface using JSON format, with security ensured through SSL and API access tokens.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1">
              All communication with the API is performed over HTTPS. To access the API, you need the partner API key which should be kept <b>secret</b>. To obtain a token, please contact us.
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }}/>
        <Box mb={2}>
          <Typography variant="body1">
            For comprehensive API details, refer to our:
          </Typography>
        </Box>
        <List dense disablePadding>
          <ListItem>
            <Link
              href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui"
              target="_blank"
              rel="noopener"
            >
              Swagger UI
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://github.com/go-travelo/layla-partner-app/blob/master/src/services/apiService.tsx"
              target="_blank"
              rel="noopener"
            >
              Javascript REST API client
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://github.com/go-travelo/layla-partner-app/blob/master/src/services/conversationService.ts"
              target="_blank"
              rel="noopener"
            >
              Javascript Socket.io client
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://bd-api.dev.beautifuldestinations.app/partner/openapi.yaml"
              target="_blank"
              rel="noopener"
            >
              OpenAPI Specification (YAML)
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://bd-api.dev.beautifuldestinations.app/partner/openapi.json"
              target="_blank"
              rel="noopener"
            >
              OpenAPI Specification (JSON)
            </Link>
          </ListItem>
        </List>
      </StyledPaper>

      <SectionTitle variant="h5">
        REST API Communication
      </SectionTitle>
      <StyledPaper elevation={3}>
        <Box mb={2}>
          <Typography variant="body1">
            Layla employs REST API for all communication. The API is secured using SSL and requires an API access token for authentication. Here's a guide to using the Layla Partner API. In order to obtain the user auth token, a partner API key is needed.
          </Typography>
        </Box>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Creating a user
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            In order to authenticate as an user, the partners need to create a user within the Layla's system. Thus, create a user in Layla's system using the <Link
            href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui/#/user/createUser"
            target="_blank"
            rel="noopener"
          >
            create user endpoint
          </Link>. This should be done from the backend side as this endpoint requires the partner API key which must be kept secret. All user properties are optional.
          </Typography>
        </Box>
        <CodeBlock dangerouslySetInnerHTML={{
          __html: `curl -X 'POST' \\
  'https://bd-api.dev.beautifuldestinations.app/user' \\
  -H 'accept: */*' \\
  -H 'Authorization: Bearer &lt;partnerApiKey&gt;' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "email": "test@layla.com",
    "firstName": "Layla",
    "lastName": "Tester",
    "photoUrl": "string"
}'`,
        }}>
        </CodeBlock>
        <Typography variant="body1">
          The response will contain the user ID which should be stored securely, e.g.
        </Typography>
        <CodeBlock dangerouslySetInnerHTML={{ __html: `"userId":"&lt;userId&gt;"` }}/>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Authenticating a user
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            In order to authenticate a user, the partners need to create a user auth token using the <Link
            href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui/#/auth/createPartnerAuth"
            target="_blank"
            rel="noopener"
          >
            create user auth endpoint
          </Link>. This should be done from the backend side as this endpoint requires the partner API key which must be kept secret.
          </Typography>
        </Box>
        <CodeBlock dangerouslySetInnerHTML={{
          __html: `curl -X 'POST' \\
  'https://bd-api.dev.beautifuldestinations.app/auth/partner' \\
  -H 'accept: application/json' \\
  -H 'Authorization: Bearer &lt;partnerApiKey&gt;' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "userId": "&lt;userId&gt;"
}'`,
        }}>
        </CodeBlock>
        <Typography variant="body1">
          The response will contain the temporary (one hour) user auth token that can be given to the user (frontend). Remember to refresh this token with the same above procedure. Output example:
        </Typography>
        <CodeBlock dangerouslySetInnerHTML={{
          __html: `{
  "token": "&lt;userAuthToken&gt;",
  ...`,
        }}/>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Create a new conversation
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            Given you have obtained a user auth token, generating a conversation can be achieved through the <Link
            href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui/#/chatbot/handleAdeoConversationStart"
            target="_blank"
            rel="noopener"
          >
            create conversation endpoint
          </Link>.
          </Typography>
        </Box>
        <CodeBlock dangerouslySetInnerHTML={{
          __html: `curl -X 'POST' \\
  'https://bd-api.dev.beautifuldestinations.app/chatbot/conversation' \\
  -H 'accept: */*' \\
  -H 'Authorization: Bearer &lt;userAuthToken&gt;' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "name": "",
  "skipGreeting": false
}'`,
        }}>
        </CodeBlock>
        <Typography variant="body1">
          The response will contain the the created <code>conversationId</code>. Output example:
        </Typography>
        <CodeBlock dangerouslySetInnerHTML={{
          __html: `{
  "conversation": {
    "id": "&lt;conversationId&gt;",
    ...
  }
}`,
        }}/>

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Send a text message
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            Given you have created a new conversation, you can now send messages to it using <Link
            href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui/#/chatbot/handleAdeoMessageText"
            target="_blank"
            rel="noopener"
          >
            send text message
          </Link>.
          </Typography>
        </Box>
        <CodeBlock dangerouslySetInnerHTML={{
          __html: `curl -X 'POST' \\
  'https://bd-api.dev.beautifuldestinations.app/chatbot/conversation/&ltconversationId&gt;/message/text' \\
  -H 'accept: */*' \\
  -H 'Authorization: Bearer &lt;userAuthToken&gt;' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "id": "&lt;messageIdOptional&gt;",
  "text": "Hello Layla"
}'`,
        }}>
        </CodeBlock>
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
          {`URL: https://bd-api.dev.beautifuldestinations.app

Options:
{
  "path": "/chatbot/socket.io",
  "query": {"conversationId": "<conversationId>"},
  "forceNew": true,
  "transports": ["websocket"],
  "auth": { "token": "<userAuthToken>" }
}`}
        </CodeBlock>
        <Typography variant="body1">
          Note that the <code>&lt;userAuthToken&gt;</code> can be obtained from <Link
          href="https://bd-api.dev.beautifuldestinations.app/partner/swagger-ui/#/auth/createPartnerAuth"
          target="_blank"
          rel="noopener"
        >this endpoint</Link>.
        </Typography>

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