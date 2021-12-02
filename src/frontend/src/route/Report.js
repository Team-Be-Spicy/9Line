import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box} from "@mui/material";


const Report = () => {


    return (
        <Box sx={{display: 'flex', flexDirection: "row"}}>
            <Box sx={{display: 'flex', flexDirection: "column", width: 1 / 2}}>
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    <Box sx={{height: 1/2, width: 1/2}}>
                        <Box sx={{height: 1, width: 1}}>
                            TOTAL REQUESTS
                        </Box>
                    </Box>
                    <PrecedencePieChart/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    <MonthBarChart/>
                    <RequestLineChart/>
                </Box>
            </Box>
            <Box sx={{width: 1 / 2}}>MAP GOES HERE</Box>
        </Box>
    );
}

export default Report;