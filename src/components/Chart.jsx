import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

const Chart = ({ arr = [], currency, days }) => {

    ChartJs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const date = []
    const price = []
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if (days === '24h') {
            date.push(new Date(arr[i][0]).toLocaleTimeString());
        }
        else {
            date.push(new Date(arr[i][0]).toLocaleDateString());
        }
        price.push(arr[i][1]);

    }

    const data = {
        labels: date,
        datasets: [{
            label: `Price in ${currency}`,
            data: price,
            borderColor: 'orange',
            backgroundColor: 'blue',
        }]
    }

    return (

        <Line options={{
            responsive: true,
        }}
            data={data}
        />

    )
}

export default Chart;