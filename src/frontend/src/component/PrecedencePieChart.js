import React from 'react';
import {PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import Box from "@mui/material/Box";

// const data = [
//     {
//         precedence: "Urgent",
//         requests: 5
//     },
//     {
//         precedence: "Urgent Surgical",
//         requests: 3
//     },
//     {
//         precedence: "Priority",
//         requests: 2
//     },
//     {
//         precedence: "Routine",
//         requests: 4
//     },
// ]

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip"
                 style={{backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc'}}>
                <label>{`${payload[0].name} : ${payload[0].value}`}</label>
            </div>
        );
    }

    return null;
};


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const COLORS = ['#FF8042', '#FFBB28', '#0088FE', '#00C49F'];

const PrecedencePieChart = ({requests}) => {

    let urgent = 0;
    let urgentSurgical = 0;
    let priority = 0;
    let routine = 0;

    requests.forEach(request => {
        if(request.precedence === "Urgent") urgent += request.totalPatient;
        else if(request.precedence === "Urgent Surgical") urgentSurgical += request.totalPatient;
        else if(request.precedence === "Priority") priority += request.totalPatient;
        else if(request.precedence === "Routine") routine += request.totalPatient;
    });

    const data = [
        {
            precedence: "Urgent",
            requests: urgent
        },
        {
            precedence: "Urgent Surgical",
            requests: urgentSurgical
        },
        {
          precedence: "Priority",
          requests: priority
        },
        {
            precedence: "Routine",
            requests: routine
        }
    ];

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 1/2, height: 1}}>
            <h3>Patients by Precedence</h3>
            <ResponsiveContainer height={350} width="100%">
                <PieChart height={300} width={300}>
                    <Pie
                        data={data}
                        color="#000000"
                        dataKey="requests"
                        nameKey="precedence"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        isAnimationActive={false}
                        cx="50%"
                        cy="50%"
                        fill="#8884d8">
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`}
                                                             fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default PrecedencePieChart;