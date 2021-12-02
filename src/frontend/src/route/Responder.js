import RequestList from "../component/RequestList";
import "./Responder.css";
import {useEffect, useState} from "react";
import {fetchRequests, fetchResponderRequests, updateStatus} from "../service/service";
import {Alert, Box, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DetailModal from "../component/DetailModal";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../component/Loading";

const Responder = () => {

    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const {user, getAccessTokenSilently} = useAuth0();

    useEffect(async () => {
        const token = await getAccessTokenSilently({audience: "https://egor-dev.com", scope: "read:requests"});
        const response = await fetchRequests(token, user.name);
        setRequests(response.data);
    }, [getAccessTokenSilently]);

    const onViewClicked = (requestId) => {
        setData(requests.find(request => request.id === requestId));
        setOpen(true);
    };

    const handleMarkComplete = async (selectedIds) => {
        setSuccessMessage(`${selectedIds.length} Request${(selectedIds.length > 1) ? "s" : ""} Completed`);

        setAlert(true);
        for (const id of selectedIds) {
            await updateStatus(id);
        }
        const res = await fetchRequests();
        setRequests(res.data);
        closeModal();
    };

    const closeModal = () => {
        setOpen(false);
    }

    return (
        <>
            {alert &&
            <Alert sx={{marginBottom: '28px', display: 'flex', alignItems: 'center'}} severity="success" action={
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
            <DetailModal
                data={data}
                open={open}
                button1Label={"Mark as Complete"}
                button2Label={"Close"}
                button1Action={() => handleMarkComplete([data.id])}
                button2Action={closeModal}
                handleClose={closeModal}
            />
        </>
    );
}

export default withAuthenticationRequired(Responder, {
    onRedirecting: () => <Loading/>,
});