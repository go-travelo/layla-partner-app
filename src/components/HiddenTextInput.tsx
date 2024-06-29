import React, { ChangeEvent, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface HiddenTextInputProps {
  label?: string,
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  initialText?: string;
}

const HiddenTextInput: React.FC<HiddenTextInputProps> = props => {
  const [isHidden, setIsHidden] = useState(true);
  const [text, setText] = useState(props.initialText || '');

  const toggleInputVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <TextField
      fullWidth
      placeholder={props.placeholder || ''}
      label={props.label || ''}
      type={isHidden ? 'password' : 'text'}
      value={text}
      onChange={handleTextChange}
      sx={{ mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleInputVisibility} edge="end">
              {isHidden ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default HiddenTextInput;
