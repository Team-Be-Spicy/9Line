import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box, CircularProgress} from "@mui/material";
import RequestList from "../component/RequestList";
import {useEffect, useState} from "react";
import {fetchCompleted} from "../service/service";
import ReportMap from "../component/ReportMap";
import {data} from "../Dummy-data";
import {useAuth0} from "@auth0/auth0-react";


const Report = () => {
    const {user, getAccessTokenSilently} = useAuth0();
    const [requests, setRequests] = useState([]); // [] default
    const [loading, setLoading] = useState(true);
    const [mapLocation, setMapLocation] = useState('');

    useEffect(async () => {
        try {
            const result = await fetchCompleted(await getAccessTokenSilently());
            setRequests(result.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }

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
                                    {requests.length}
                                    <br/>
                                    Completed Missions
                                </h2>
                            </Box>
                        </Box>
                        <PrecedencePieChart requests={requests}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: "row"}}>
                        <MonthBarChart/>
                        <RequestLineChart requests={requests}/>
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