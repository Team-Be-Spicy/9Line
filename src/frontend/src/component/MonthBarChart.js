import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Box} from "@mui/material";

const months = [
    {
        name: "Jan",
        responderOne: 3,
        responderTwo: 4
    },
    {
        name: "Feb",
        responderOne: 2,
        responderTwo: 3
    },
    {
        name: "Mar",
        responderOne: 5,
        responderTwo: 2
    },
    {
        name: "Apr",
        responderOne: 3,
        responderTwo: 3
    },
    {
        name: "May",
        responderOne: 4,
        responderTwo: 3
    },
    {
        name: "Jun",
        responderOne: 2,
        responderTwo: 4
    },
    {
        name: "Jul",
        responderOne: 5,
        responderTwo: 6
    },
    {
        name: "Aug",
        responderOne: 5,
        responderTwo: 5
    },
    {
        name: "Sep",
        responderOne: 3,
        responderTwo: 2
    },
    {
        name: "Oct",
        responderOne: 3,
        responderTwo: 4
    },
    {
        name: "Nov",
        responderOne: 2,
        responderTwo: 1
    },
    {
        name: "Dec",
        responderOne: 0,
        responderTwo: 3
    },
]

const MonthBarChart = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 1, width: 1/2}}>
            <h3>Responder Activity</h3>
            <ResponsiveContainer height={350} width="100%">
            <BarChart data={months}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"name"}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="responderOne" fill="#8884d8" />
                <Bar dataKey="responderTwo" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default MonthBarChart;