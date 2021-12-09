import React, {useEffect, useState} from 'react';
import "./Dispatcher.css";
import RequestList from "../component/RequestList";
import DetailModal from "../component/DetailModal";
import {fetchRequests, getResponders, updateResponder, updateStatus} from "../service/service";
import AssignResponderModal from "../component/AssignResponderModal";
import {Alert, Box, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../component/Loading";

const Dispatcher = () => {

    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [currentRequest, setCurrentRequest] = useState({});
    const [detailOpen, setDetailOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedIDs, setSelectedIDs] = useState([]);
    const [selectedResponder, setSelectedResponder] = useState("responder1@nineline.com");
    const [responders, setResponders] = useState([]);
    const options = {scope: "update:requests assign:requests", audience: "https://egor-dev.com"};
    const {getAccessTokenSilently} = useAuth0();

    useEffect(async () => {
        await fetchFromDB();
    }, []);

    const fetchFromDB = async () => {
        const token = await getAccessTokenSilently(options);
        setRequests((await fetchRequests(token)).data.filter(r => r.status !== "Complete"))
        const resp = await getResponders(token);
        const responderNames = resp.data.map(r => r.email);
        console.log(responderNames);
        setResponders(responderNames);
        setSelectedResponder(responderNames[0]);
    };

    const assignResponderToSingle = async () => {
        const token = await getAccessTokenSilently(options);
        // console.log(token);
        await updateResponder(token, currentRequest.id, selectedResponder);
        await updateStatus(token, currentRequest.id, "Assigned");
        setAlert(true);
        handleDetailClose();
        await fetchFromDB();
    }

    const assignResponderToMultiple = async () => {
        const token = await getAccessTokenSilently(options);
        // console.log(token);
        for (const id of selectedIDs) {
            await updateResponder(token, id, selectedResponder);
            await updateStatus(token, id, "Assigned");
        }
        setAlert(true);
        handleAssignClose();
        await fetchFromDB();
    }

    const handleDetailClose = () => {
        setDetailOpen(false);
    }

    const handleAssignClose = () => {
        setAssignOpen(false);
    }

    const onViewClicked = (param) => {
        setAlert(false);
        setCurrentRequest(requests.find(x => x.id === param));
        setDetailOpen(true);
    }

    const onActionClicked = (checkedIDs) => {
        setAlert(false);
        setSelectedIDs(checkedIDs);
        setAssignOpen(true);
    }

    return (
        <>
            {alert && <Alert sx={{marginBottom: '28px', display: 'flex', alignItems: 'center',backgroundColor: 'rgba(38,255,0,0.1)'}} severity="success" action={
                <Box>
                    <IconButton
                        color='success'
                        onClick={() => setAlert(false)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            }>Assigned to {selectedResponder}</Alert>}
            <AssignResponderModal open={assignOpen}
                                  handleClose={handleAssignClose}
                                  responders={responders}
                                  selectedResponder={selectedResponder}
                                  setSelectedResponder={setSelectedResponder}
                                  assignResponder={assignResponderToMultiple}/>
            <DetailModal data={currentRequest}
                         open={detailOpen}
                         handleClose={handleDetailClose}
                         button1Label={"assign"}
                         button1Action={assignResponderToSingle}
                         button2Label={"cancel"}
                         button2Action={handleDetailClose}
                         isDispatcher={true}
                         responders={responders}
                         selectedResponder={selectedResponder}
                         setSelectedResponder={setSelectedResponder}
            />
            <div className="Dispatcher">
                <div className="requestListContainer">
                    <Typography fontSize="40px" fontWeight="200" paddingBottom="20px" color="text.primary">Outstanding MEDEVAC Requests</Typography>
                    <RequestList user={"dispatcher"}
                                 requests={requests}
                                 onActionClicked={onActionClicked}
                                 onViewSelected={onViewClicked}
                                 haveCheckbox={true}/>
                </div>
            </div>
        </>
    );
}

export default withAuthenticationRequired(Dispatcher, {
    onRedirecting: () => <Loading/>,
});