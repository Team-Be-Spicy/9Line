import React, {useEffect, useState} from 'react';
import "./Dispatcher.css";
import RequestList from "../component/RequestList";
import DetailModal from "../component/DetailModal";
import {fetchRequests, updateResponder} from "../service/service";
import AssignResponderModal from "../component/AssignResponderModal";
import {Alert, Box, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../component/Loading";

const Dispatcher = () => {

    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [currentRequest, setCurrentRequest] = useState({});
    const [detailOpen, setDetailOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedIDs, setSelectedIDs] = useState([]);
    const [selectedResponder, setSelectedResponder] = useState("Responder One");

    useEffect(() => {
        fetchFromDB();
    }, []);

    const fetchFromDB = () => {
        fetchRequests("dispatcher").then(res => setRequests(res.data));
    }

    const assignResponderToSingle = async () => {
        await updateResponder(currentRequest.id, selectedResponder);
        setAlert(true);
        handleDetailClose();
        fetchFromDB();
    }

    const assignResponderToMultiple = async () => {
        for (const id of selectedIDs) {
            await updateResponder(id, selectedResponder);
        }
        setAlert(true);
        handleAssignClose();
        fetchFromDB();
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
            {alert && <Alert sx={{marginBottom: '28px'}} severity="success" action={
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
                         selectedResponder={selectedResponder}
                         setSelectedResponder={setSelectedResponder}
            />
            <div className="Dispatcher">
                <div className="requestListContainer">
                    <h1>Outstanding MEDEVAC Requests</h1>
                    <RequestList user={"dispatcher"}
                                 requests={requests}
                                 onActionClicked={onActionClicked}
                                 onViewSelected={onViewClicked}/>
                </div>
            </div>
        </>
    );
}


export default withAuthenticationRequired(Dispatcher, {
    onRedirecting: () => <Loading/>,
});