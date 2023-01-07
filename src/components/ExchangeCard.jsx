import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react'

const ExchangeCard = ({ name, image, rank, url }) => {
    return (
        <>
            <a href={url} target={"blank"}>
                <VStack
                    w={'52'}
                    p={"10"}
                    transition={"all 0.3s"}
                    css={{
                        "&:hover": {
                            transform: 'scale(1.1)',
                        }
                    }}
                    m={'4'}
                    borderRadius={'3xl'}
                    shadow={'lg'}>
                    <Image src={image} w={'10'} h={"10"} objectFit={'contain'} alt={"Exchange"} />
                    <Heading size={'md'} noOfLines={1}>{rank}</Heading>
                    <Text noOfLines={1}>{name}</Text>
                </VStack>
            </a>
        </>
    )
}

export default ExchangeCard;