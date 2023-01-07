import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import bcoinImage from '../images/btc.png'
import { motion } from 'framer-motion'

const Home = () => {
    return (
        <Box bgColor={'blackAlpha.900'} w={"full"} h={"85vh"}>
            <motion.div style={{
                height: "80vh",
            }}
                animate={{
                    translateY: '20px',
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                <Image
                    w={'full'}
                    h={"full"}
                    objectFit={"contain"}
                    src={bcoinImage}
                />
            </motion.div>
            <Text fontFamily={"Poppins"} color={"whiteAlpha.900"} fontSize={"6xl"} mt={"-15"} textAlign={"center"}>B-COIN</Text>
        </Box>
    )
}

export default Home;