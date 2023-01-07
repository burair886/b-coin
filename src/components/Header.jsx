import { Button, HStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HStack p={'4'} shadow={'base'} bgColor={'orange.400'}>
            <Button variant={'outline'} color={'Black'}><Link to={'/'}>Home</Link></Button>
            <Button variant={'outline'} color={'Black'}><Link to={'/exchange'}>Exchange</Link></Button>
            <Button variant={'outline'} color={'Black'}><Link to={'/coins'}>Coins</Link></Button>
        </HStack>
    )
}

export default Header;