import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const RequestLineChart = ({requests}) => {

    let monthArray = new Array(12).fill(0);

    requests.forEach((request) => {
        if(request.date !== null) {
            let splitDate = request.date.split("-");
            const month = splitDate[1]-1;
            monthArray[month]++;
        }
    })

    const months = [
        {
            name: "Jan",
            requests: monthArray[0]
        },
        {
            name: "Feb",
            requests: monthArray[1]
        },
        {
            name: "Mar",
            requests: monthArray[2]
        },
        {
            name: "Apr",
            requests: monthArray[3]
        },
        {
            name: "May",
            requests: monthArray[4]
        },
        {
            name: "Jun",
            requests: monthArray[5]
        },
        {
            name: "Jul",
            requests: monthArray[6]
        },
        {
            name: "Aug",
            requests: monthArray[7]
        },
        {
            name: "Sep",
            requests: monthArray[8]
        },
        {
            name: "Oct",
            requests: monthArray[9]
        },
        {
            name: "Nov",
            requests: monthArray[10]
        },
        {
            name: "Dec",
            requests: monthArray[11]
        },
    ]

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 1,
        }}>
            <Typography fontSize="20px" fontWeight="800" color="text.secondary">Request Trends</Typography>
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