import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box, CircularProgress} from "@mui/material";
import RequestList from "../component/RequestList";
import {useEffect, useState} from "react";
import {fetchRequests} from "../service/service";
import ReportMap from "../component/ReportMap";
import {data} from "../Dummy-data";


const Report = () => {
    const [requests, setRequests] = useState(data); // [] default
    const [loading, setLoading] = useState(true);
    const [mapLocation, setMapLocation] = useState('');

    useEffect(() => {
        // fetchRequests("dispatcher").then(res => {
        //     setRequests(res.data)
        // }).finally(() => setLoading(false));
        setLoading(false)

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
                <Box sx={{width: 1 / 2}}>
                    {loading ? <CircularProgress/> : <ReportMap mapLocation={mapLocation} requests={requests}/>}
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <div className="requestListContainer">
                    <h1>Completed MEDEVAC Requests</h1>
                    <RequestList user="responder" requests={requests} setMapLocation={setMapLocation}/>
                </div>
            </Box>
        </Box>
    );
}

export default Report;