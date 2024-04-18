import React from 'react';
import { Box, Textarea } from '@chakra-ui/react';


const ChatInput = () => {
    return (
      <Box position="fixed" left="0" bottom="0" width="100%" className="Input" height="auto" >
        <Box className="Input__controls" display="flex" flexDirection="column">
          <Box className="Input__leftControls" display="flex" alignItems="center" flexGrow={1}>
            <Textarea
              width="100%"
              padding={10}
              className="DialogInput__input"
              placeholder="Write a question... 
Type / for a quick command"
              spellCheck="false"
              resize="none"
              height="52px"
              bg='white'
              color='black'
            />
          </Box>
          <Box className="Input__rightControls" display="flex" alignItems="center">
            {/* Right controls here */}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default ChatInput;