import React from 'react';
import SettingsForm from '../components/SettingsForm';
import { Box } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <SettingsForm/>
      </Box>
    </Box>
  );
};

export default Settings;