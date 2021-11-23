import RequestList from "../component/RequestList";
import "./Responder.css";
import {useEffect, useState} from "react";
import {fetchRequests, updateStatus} from "../service/service";
import {Alert, Box, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const Responder = () => {

    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchRequests().then(res => setRequests(res.data));
    }, []);

    const onViewClicked = (param) => {
        alert(param);
    };

    const handleMarkComplete = async (selectedIds) => {
        setSuccessMessage(`${selectedIds.length} Request${(selectedIds.length > 1) ? "s" : ""} Completed`);

        setAlert(true);
        for (const id of selectedIds) {
            await updateStatus(id);
        }
        const res = await fetchRequests();
        setRequests(res.data);
    };

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
            }>{successMessage}</Alert>}
            <div className="Responder">
                <div className="requestListContainer">
                    <h1>MEDEVAC Assignment</h1>
                    <RequestList user="responder" requests={requests} onActionClicked={handleMarkComplete}
                                 onViewSelected={onViewClicked}/>
                </div>
            </div>
        </>
    );
}

export default Responder;