import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Box from "@mui/material/Box";

const RequestLineChart = () => {

    const months = [
        {
            name: "Jan",
            requests: 7
        },
        {
            name: "Feb",
            requests: 5
        },
        {
            name: "Mar",
            requests: 7
        },
        {
            name: "Apr",
            requests: 6
        },
        {
            name: "May",
            requests: 7
        },
        {
            name: "Jun",
            requests: 6
        },
        {
            name: "Jul",
            requests: 11
        },
        {
            name: "Aug",
            requests: 10
        },
        {
            name: "Sep",
            requests: 5
        },
        {
            name: "Oct",
            requests: 7
        },
        {
            name: "Nov",
            requests: 3
        },
        {
            name: "Dec",
            requests: 3
        },
    ]

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 1,
            width: 1 / 2
        }}>
            <h3>Request Trends</h3>
            <ResponsiveContainer height={350} width="100%">
                <AreaChart
                    data={months}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="requests" stroke="#8884d8" fill="#8884d8"/>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default RequestLineChart;