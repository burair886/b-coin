import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react'

const Footer = () => {
    return (
        <Box bgColor={'blackAlpha.900'} color={"whiteAlpha.900"} minH={"48"} px={"16"}
            py={["16", "8"]}>
            <Stack direction={['column', 'row']} h={"full"} alignItems={"center"}>
                <VStack w={'full'} alignItems={['center', 'flex-start']}>
                    <Text fontWeight={'bold'}>About US</Text>
                    <Text fontSize={'sm'} textAlign={['center', 'left']}>Project Completed By  <strong>Syed Burair Hussain Zaidi</strong>. Cell No: <strong>0311-3567552</strong></Text>
                </VStack>
                <VStack>
                    <Avatar boxSize={'20'} mt={['4', '0']} />
                    <Text textAlign={'center'}>Our Founder</Text>
                </VStack>
            </Stack>
        </Box>
    )
}

export default Footer;