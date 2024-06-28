import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const TypingMessage = () => {
  const [ellipsis, setEllipsis] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      bgcolor="#f0f0f0"
    >
      <Typography
        component="div"
        color="textSecondary"
      >
        Layla is typing{ellipsis}
      </Typography>
    </Box>
  );
};

export default TypingMessage;
