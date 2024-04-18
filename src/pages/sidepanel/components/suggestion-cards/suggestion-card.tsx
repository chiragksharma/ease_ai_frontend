// SuggestionCard.js
import React from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';

const SuggestionCard = ({ label, command, icon }) => {
  return (
    <Box bg='#ececec' p={8} borderRadius='5px' borderWidth='1px' display='flex' alignItems='center' flexDirection={'row'} gap={9}>
      <Image src={icon} boxSize='25px' />
      <VStack spacing={1} align='start' ml={4}>
        <Text fontWeight='bold' margin={0}>{label}</Text>
        <Text fontSize='sm'  margin={0}>{command}</Text>
      </VStack>
    </Box>
  );
};

export default SuggestionCard;
