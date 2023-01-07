import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import CoinCard from './CoinCard';
import ErrorComponent from './ErrorComponent';

const Coins = () => {

    const [coin, setCoin] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState('pkr')

    const btns = new Array(132).fill(1)

    const changePage = (page) => {
        setPage(page)
        setloading(true)
    }

    const currencySymbol = currency === "pkr" ? "₨" : currency === "inr" ? "₹" : currency === "eur" ? "€" : '$';

    useEffect(() => {

        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoin(data)
                // console.log(data)
                setloading(false)
            } catch (error) {
                setError(true)
                setloading(false)
            }
        };
        fetchCoin()
    }, [currency, page]);

    if (error) return <ErrorComponent message={"Error while fetching Coins"} />

    return (
        <Container maxW={'container.lg'} >
            {loading ? <Loader /> : (
                <>
                    <RadioGroup value={currency} p={'8'} onChange={setCurrency}>
                        <HStack spacing={'4'} justifyContent={'space-evenly'}>
                            <Radio value='pkr'>₨</Radio>
                            <Radio value='inr'>₹</Radio>
                            <Radio value='eur'>€</Radio>
                            <Radio value='usd'>$</Radio>
                        </HStack>
                    </RadioGroup>
                    <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                        {
                            coin.map((item) => (
                                <CoinCard
                                    id={item.id}
                                    key={item.id}
                                    name={item.name}
                                    price={item.current_price}
                                    symbol={item.symbol} image={item.image}
                                    currencySymbol={currencySymbol}
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

export default Coins;