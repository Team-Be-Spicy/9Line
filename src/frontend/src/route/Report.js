import MonthBarChart from "../component/MonthBarChart";
import PrecedencePieChart from "../component/PrecedencePieChart";
import RequestLineChart from "../component/RequestLineChart";
import {Box, Card, Grid, Typography} from "@mui/material";
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
        <Box sx={{width: '100%', paddingBottom: '24px'}}>
            {/*<Typography align={'center'} variant={"h5"} color="text.primary" fontSize="30px" fontWeight="200">*/}
            {/*    {requests.length} Completed Missions*/}
            {/*</Typography>*/}
            <div style={{width: "100%", height: '75vh'}}>
                <ReportMap mapLocation={mapLocation} requests={allRequests}/>
            </div>
            <Grid sx={{marginY: '24px'}} container>
                <Grid item xs={12} md={6}><Card elevation={4} sx={{
                    marginLeft: '24px',
                    marginRight: '12px',
                    paddingY: '12px'
                }}><PrecedencePieChart requests={requests}/></Card></Grid>
                <Grid item xs={12} md={6}><Card elevation={4} sx={{
                    marginLeft: '12px',
                    marginRight: '24px',
                    paddingRight: '24px',
                    paddingY: '12px'
                }}><MonthBarChart requests={requests}/></Card></Grid>
            </Grid>
            <Card elevation={4} sx={{marginX: '24px', paddingY: '12px'}}><RequestLineChart requests={requests}/></Card>
            <Box>
                <Box sx={{ marginTop: '24px', marginX: '24px' }}>
                    <Card elevation={4} sx={{paddingY: '12px', width: "100%"}}>
                        <RequestList user="responder" requests={allRequests} setMapLocation={setMapLocation}
                                     onViewSelected={onViewClicked} haveCheckbox={false}/>
                    </Card>
                    <DetailModal
                        data={data}
                        open={open}
                        handleClose={closeModal}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Report;