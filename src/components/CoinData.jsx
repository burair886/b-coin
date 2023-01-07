import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinData = () => {

    const [coins, setCoins] = useState({});
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('pkr');
    const [chartArray, setChartArray] = useState([]);
    const [days, setDays] = useState('24h');


    const currencySymbol = currency === "pkr" ? "₨" : currency === "inr" ? "₹" : currency === "eur" ? "€" : '$';

    const params = useParams();

    const btnss = ['24h', '7d', '14d', '30d', '60d', '120d', '365d', 'max']

    useEffect(() => {

        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);

                const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);

                setCoins(data);
                setChartArray(chartData.prices);
                // console.log(chartData)
                setloading(false);
            } catch (error) {
                setError(true);
                setloading(false);
            }
        };
        fetchCoins();
    }, [params.id, currency, days]);

    if (error) return <ErrorComponent message={"Error while fetching Coin Data"} />;

    const switchChartStats = (key) => {
        switch (key) {
            case '24h':
                setDays("24h");
                setloading(true);
                break;
            case '7d':
                setDays("7d");
                setloading(true);
                break;
            case '14d':
                setDays("14d");
                setloading(true);
                break;
            case '30d':
                setDays("30d");
                setloading(true);
                break;
            case '60d':
                setDays("60d");
                setloading(true);
                break;
            case '120d':
                setDays("120d");
                setloading(true);
                break;
            case '365d':
                setDays("365d");
                setloading(true);
                break;
            case 'max':
                setDays("max");
                setloading(true);
                break;
            default:
                setDays("7d");
                setloading(true);
                break;
        }
    }

    return (
        <Container maxW={'container.xl'}>
            {
                loading ?
                    (
                        <Loader />
                    ) :
                    <>

                        <Box width={'full'} borderWidth={1}>
                            <Chart currency={currencySymbol} arr={chartArray} days={days} />
                        </Box>
                        <HStack p={'8'} justifyContent={"center"} >
                            {
                                btnss.map((i) => (
                                    <Button variant={'outline'} bgColor={'orange.300'} key={i} onClick={() => switchChartStats(i)}>{i}</Button>
                                ))
                            }
                        </HStack>
                        <RadioGroup value={currency} p={'8'} onChange={setCurrency}>
                            <HStack spacing={'4'} justifyContent={'space-evenly'}>
                                <Radio value='pkr'>₨</Radio>
                                <Radio value='inr'>₹</Radio>
                                <Radio value='eur'>€</Radio>
                                <Radio value='usd'>$</Radio>
                            </HStack>
                        </RadioGroup>

                        <VStack spacing={'4'} p={'16'} alignItems={"flex-start"}>
                            <Text fontSize={'small'} alignSelf={'center'} opacity={"0.7"}>
                                Last Update On {Date(coins.market_data.last_updated).split("G")[0]}
                            </Text>
                            <Image
                                w={'16'} h={"16"} objectFit={"contain"}
                                src={coins.image.large} />

                            <Stat>
                                <StatLabel>{coins.name}</StatLabel>
                                <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
                                <StatHelpText>
                                    <StatArrow type={coins.market_data.price_change_24h_in_currency[currency] > 0 ? 'increase' : 'decrease'} />
                                    {coins.market_data.price_change_24h_in_currency[currency]}%
                                </StatHelpText>
                            </Stat>
                            <Badge fontSize={'2xl'} bgColor={"orange.300"} color={"white"}>
                                {`#${coins.market_cap_rank}`}
                            </Badge>
                            <CustomBar high={`${coins.market_data.high_24h[currency]} ${currencySymbol}`} low={`${coins.market_data.low_24h[currency]} ${currencySymbol}`} />
                            <Box w={'full'} p={"4"}>
                                <Item title={"All Time High"} value={`${coins.market_data.ath[currency]} ${currencySymbol}`} />
                                <Item title={"All Time Low"} value={`${coins.market_data.atl[currency]} ${currencySymbol}`} />
                                <Item title={"All Time High Change %"} value={`${coins.market_data.ath_change_percentage[currency]} ${currencySymbol}`} />
                                <Item title={"All Time Low Change %"} value={`${coins.market_data.atl_change_percentage[currency]} ${currencySymbol}`} />
                                <Item title={"Circulating Supply"} value={coins.market_data.circulating_supply} />
                                <Item title={"Max Supply"} value={coins.market_data.max_supply} />
                                <Item title={"Market Capital"} value={`${coins.market_data.market_cap[currency]} ${currencySymbol}`} />
                                <Item title={"Total Volume"} value={`${coins.market_data.total_volume[currency]} ${currencySymbol}`} />
                            </Box>
                        </VStack>
                    </>
            }
        </Container >
    );
};

const Item = ({ title, value }) => (
    <HStack justifyContent={'space-between'} w={"full"} my={"4"}>
        <Text fontFamily={'Hind'} letterSpacing={"widest"}>{title}</Text>
        <Text fontFamily={'Hind'} >{value}</Text>
    </HStack>
)

const CustomBar = ({ high, low }) => (
    <VStack w={'full'}>
        <Progress value={50} colorScheme={"orange"} w={'full'} />
        <HStack justifyContent={'space-between'} w={"full"}>
            <Badge children={low} colorScheme={'red'} />
            <Text fontSize={"sm"}>24 Hours Range</Text>
            <Badge children={high} colorScheme={'green'} />
        </HStack>
    </VStack>
)
export default CoinData;