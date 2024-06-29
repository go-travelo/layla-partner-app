import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setConnectionUrl } from '../features/conversationSlice';
import HiddenTextInput from './HiddenTextInput';
import { selectBaseApiUrl, selectPartnerApiKey, setBaseApiUrl as setBaseApiUrlAction, setPartnerApiKey as setPartnerApiKeyAction } from '../features/settingsSlice';

const ChatConnectionForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const initialPartnerApiKey = useAppSelector(selectPartnerApiKey);
  const initialBaseApiUrl = useAppSelector(selectBaseApiUrl);

  const [partnerApiKey, setPartnerApiKey] = useState(initialPartnerApiKey);
  const [baseApiUrl, setBaseApiUrl] = useState(initialBaseApiUrl);

  const handleSave = () => {
    dispatch(setConnectionUrl(baseApiUrl));
    dispatch(setPartnerApiKeyAction(partnerApiKey));
    dispatch(setBaseApiUrlAction(baseApiUrl));
  };

  return (
    <Box p={2} width="100%" maxWidth="600px">
      <Box mb={2}>
        <HiddenTextInput
          initialText={partnerApiKey}
          onChange={(e) => setPartnerApiKey(e.target.value)}
          label="Partner API access key"
        />
        <TextField
          fullWidth
          label="API base URL"
          value={baseApiUrl}
          onChange={e => setBaseApiUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      <Button variant="contained" onClick={handleSave} sx={{ marginBottom: 1 }}>
        Save
      </Button>
    </Box>
  );
};

export default ChatConnectionForm;
