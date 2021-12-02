import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box} from "@mui/material";
import RequestList from "../component/RequestList";
import {useEffect, useState} from "react";
import {fetchRequests} from "../service/service";


const Report = () => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests("dispatcher").then(res => setRequests(res.data));
    }, [])

    return (
        <Box sx={{display: 'flex', flexDirection: "column"}}>
            <Box sx={{display: 'flex', flexDirection: "row"}}>
                <Box sx={{display: 'flex', flexDirection: "column", width: 1 / 2}}>
                    <Box sx={{display: 'flex', flexDirection: "row"}}>
                        <Box sx={{height: 1, width: 1 / 2}}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 1,
                                width: 1
                            }}>
                                <h2>
                                    25 {/*placeholder*/}
                                    <br/>
                                    Completed Missions
                                </h2>
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
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <div className="requestListContainer">
                <h1>Completed MEDEVAC Requests</h1>
                <RequestList user={"responder"} requests={requests}/>
            </div>
            </Box>
        </Box>
    );
}

export default Report;