import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box, Typography} from "@mui/material";


const MonthBarChart = ({requests}) => {

    const months = [
        {
            name: "Jan",
        },
        {
            name: "Feb",
        },
        {
            name: "Mar",
        },
        {
            name: "Apr",
        },
        {
            name: "May",
        },
        {
            name: "Jun",
        },
        {
            name: "Jul",
        },
        {
            name: "Aug",
        },
        {
            name: "Sep",
        },
        {
            name: "Oct",
        },
        {
            name: "Nov",
        },
        {
            name: "Dec",
        },
    ]

    let responders = [];
    const COLORS = ['#FF8042', '#0088FE', '#FFBB28', '#00C49F'];

    requests.forEach((request) => {
        if(request.date !== null) {
            let splitDate = request.date.split("-");
            const month = splitDate[1]-1;
            if (!responders.includes(request.responder)) responders.push(request.responder);
            months[month][request.responder] = months[month][request.responder]+1 || 1;
        }
    })

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 1, width: 1/2}}>
            <Typography fontSize="20px" fontWeight="800" color="text.primary">Responder Activity</Typography>
            <ResponsiveContainer height={350} width="100%">
            <BarChart data={months}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"name"}/>
                <YAxis />
                <Tooltip />
                <Legend />
                {responders.map((responder, index) => {return <Bar key={index} dataKey={responder} fill={COLORS[index % COLORS.length]}/>})}
            </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default MonthBarChart;