import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box, CircularProgress, Typography} from "@mui/material";
import RequestList from "../component/RequestList";
import {useEffect, useState} from "react";
import {fetchAll, fetchCompleted} from "../service/service";
import ReportMap from "../component/ReportMap";
import {data} from "../Dummy-data";
import {useAuth0} from "@auth0/auth0-react";


const Report = () => {
    const {user, getAccessTokenSilently} = useAuth0();
    const [requests, setRequests] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapLocation, setMapLocation] = useState('');

    useEffect(async () => {
        try {
            const result = await fetchCompleted(await getAccessTokenSilently());
            const allResults = await fetchAll(await getAccessTokenSilently());
            setAllRequests(allResults.data);
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
                                <Typography fontSize="30px" fontWeight="200" paddingBottom="20px" color="text.primary">
                                    {requests.length}
                                    <br/>
                                    Completed Missions
                                </Typography>
                            </Box>
                        </Box>
                        <PrecedencePieChart requests={requests}/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: "row"}}>
                        <MonthBarChart requests={requests}/>
                        <RequestLineChart requests={requests}/>
                    </Box>
                </Box>
                <Box sx={{width: 1 / 2}}>
                    {loading ? <CircularProgress/> : <ReportMap mapLocation={mapLocation} requests={allRequests}/>}
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <div className="requestListContainer">
                    <Typography fontSize="40px" fontWeight="200" paddingBottom="20px" color="text.primary">MEDEVAC Requests</Typography>
                    <RequestList user="responder" requests={allRequests} setMapLocation={setMapLocation}/>
                </div>
            </Box>
        </Box>
    );
}

export default Report;