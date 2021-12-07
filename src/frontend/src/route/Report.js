import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box, CircularProgress, Grid, Typography, useMediaQuery} from "@mui/material";
import RequestList from "../component/RequestList";
import {useEffect, useState} from "react";
import {fetchAll, fetchCompleted} from "../service/service";
import ReportMap from "../component/ReportMap";
import {data} from "../Dummy-data";
import {useAuth0} from "@auth0/auth0-react";
import {useTheme} from "@mui/material/styles"


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

    return !loading && (
        <Box sx={{width: '100%', height: '60vh', padding: 0, margin: '16px'}}>
            <Typography align={'center'} variant={"h5"}>
                {requests.length}
                <br/>
                Completed Missions
            </Typography>
            <ReportMap mapLocation={mapLocation} requests={allRequests}/>
            <Grid container spacing={2}>
                    <PrecedencePieChart xs={6} requests={requests}/>
                    <MonthBarChart xs={6} requests={requests}/>
            </Grid>
            <RequestLineChart requests={requests}/>
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <div className="requestListContainer">
                        <h1>MEDEVAC Requests</h1>
                        <RequestList user="responder" requests={allRequests} setMapLocation={setMapLocation}/>
                    </div>
                </Box>
            </Box>
        </Box>

    )
}

export default Report;


