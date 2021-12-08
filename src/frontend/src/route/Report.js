import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box, Grid, Typography} from "@mui/material";
import RequestList from "../component/RequestList";
import {useEffect, useState} from "react";
import {fetchAll, fetchCompleted} from "../service/service";
import ReportMap from "../component/ReportMap";
import {useAuth0} from "@auth0/auth0-react";
import DetailModal from "../component/DetailModal";


const Report = () => {
    const {user, getAccessTokenSilently} = useAuth0();
    const [requests, setRequests] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapLocation, setMapLocation] = useState('');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

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

    const onViewClicked = (requestId) => {
        setData(allRequests.find(request => request.id === requestId));
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    }

    return !loading && (
        <Box sx={{width: '100vw'}}>
            <Typography align={'center'} variant={"h5"} color="text.primary" fontSize="30px" fontWeight="200">
                {requests.length} Completed Missions
            </Typography>
            <div style={{width: "100%", height: '60vh'}}>
                <ReportMap mapLocation={mapLocation} requests={allRequests}/>
            </div>
            <Grid container>
                <Grid xs={12} md={6}> <PrecedencePieChart requests={requests}/></Grid>
                <Grid xs={12} md={6}> <MonthBarChart requests={requests}/></Grid>
            </Grid>
            <RequestLineChart requests={requests}/>
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <div className="requestListContainer">
                        <Typography fontSize="40px" fontWeight="200" paddingBottom="20px" color="text.primary">MEDEVAC
                            Requests</Typography>
                        <RequestList user="responder" requests={allRequests} setMapLocation={setMapLocation}
                                     onViewSelected={onViewClicked} haveCheckbox={false}/>
                        <DetailModal
                            data={data}
                            open={open}
                            handleClose={closeModal}
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default Report;