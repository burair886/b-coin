import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index'
import { Button, Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard'
import ErrorComponent from './ErrorComponent';

const Exchange = () => {

    const [exchanges, setExchanges] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setPage] = useState(1)
    const [error, setError] = useState(false)
    const btns = new Array(50).fill(1)
    const changePage = (page) => {
        setPage(page)
        setloading(true)
    }

    useEffect(() => {

        const fetchExchange = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`)
                setExchanges(data)
                setloading(false)
            } catch (error) {
                setError(true)
                setloading(false)
            }
        }
        fetchExchange()
    }, [])

    if (error) return <ErrorComponent message={"Error while fetching Exchanges"} />

    return (
        <Container maxW={'container.lg'}>
            {loading ? <Loader /> : (
                <>
                    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                        {
                            exchanges.map((item) => (
                                <ExchangeCard
                                    key={item.id}
                                    name={item.name}
                                    rank={item.trust_score_rank} image={item.image}
                                    url={item.url}

                                />
                            ))
                        }
                    </HStack>
                    <HStack w={'full'} overflowX={'auto'} marginBottom={'8'} padding={'8'}>
                        {
                            btns.map((item, index) => (
                                <Button key={index}
                                    variant={'ghost'} bgColor={'orange'} onClick={() => changePage(index + 1)}>{index + 1}</Button>
                            ))
                        }
                    </HStack>
                </>
            )}
        </Container>
    )
}

export default Exchange;