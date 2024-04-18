import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Box } from '@chakra-ui/react'
import '@pages/sidepanel/components/header/index.scss';

const Header=()=>{
    
    return(
        <div className="header-bar">
        <div className="navbar">
        <Box bg='transparent' w='100%' p={4} color='black'>
            Ease.ai
        </Box>
        </div>
        <div className="header-message">
        <Box bg='#ececec' w='90%' p={10} color='black' borderRadius='5px' borderWidth='1px' fontWeight='400' fontSize='small' display='flex' >
        Type / to access 100+ commands, e.g. /summary and /compose. Use parameters like this. I can read Web & PDF content in page-aware mode.
        </Box>
        </div>
        </div>
    )
}

export default Header;