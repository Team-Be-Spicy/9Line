import RequestList from "../component/RequestList";
import "./Responder.css";
import {useEffect, useState} from "react";
import {checkUserRole, fetchRequests, updateStatus} from "../service/service";
import {Alert, Box, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DetailModal from "../component/DetailModal";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../component/Loading";
import {useNavigate} from "react-router-dom";

const Responder = () => {

    const [requests, setRequests] = useState([]);
    const [alert, setAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [isResponder, setIsResponder] = useState(false);
    let navigate = useNavigate();
    const {user, getAccessTokenSilently, getAccessTokenWithPopup, isAuthenticated} = useAuth0();
    const responderOptions = {scope: "update:requests read:requests", audience: "https://egor-dev.com"}
    const dispatcherOptions = {scope: "assign:requests", audience: "https://egor-dev.com"}

    useEffect(async () => {
        if (isAuthenticated) {
            await checkRole();
            await updateRequests();
        }
    }, [isAuthenticated]);

    const checkRole = async () => {
        try {
            const response = await checkUserRole(await getToken(dispatcherOptions))
            if (response.data.includes("SCOPE_assign:requests")){
                setIsResponder(false);
                // if you make it here, you're a dispatcher and shouldn't be allowed on this page
                navigate("/");
            }else{
                setIsResponder(true);
            }
        } catch {
            setIsResponder(true);
        }
    }

    const updateRequests = async () => {
        const response = await fetchRequests(await getToken(responderOptions), user.name);
        setRequests(response.data.filter(d => d.status !== "Complete"));
    }

    const onViewClicked = (requestId) => {
        setData(requests.find(request => request.id === requestId));
        setOpen(true);
    };

    const getToken = async (options) => {
        let token = "";
        try {
            token = await getAccessTokenSilently(options);
        } catch {
            token = await getAccessTokenWithPopup(options);
        }
        return token;
    }

    const handleMarkComplete = async (selectedIds) => {
        setSuccessMessage(`${selectedIds.length} Request${(selectedIds.length > 1) ? "s" : ""} Completed`);
        setAlert(true);
        for (const id of selectedIds) {
            await updateStatus(await getToken(responderOptions), id, "Complete");
        }
        await updateRequests();
        closeModal();
    };

    const closeModal = () => {
        setOpen(false);
    }

    return (
        isResponder ?
        <>
            {alert &&
            <Alert sx={{
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(38,255,0,0.1)'
            }}
                   severity="success" action={
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
                    <Typography fontSize="40px" fontWeight="200" paddingBottom="20px" color="text.primary">MEDEVAC
                        Assignment</Typography>
                    <RequestList user="responder" requests={requests} onActionClicked={handleMarkComplete}
                                 onViewSelected={onViewClicked} haveCheckbox={true}/>
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
                : <Loading/>

);
}

export default withAuthenticationRequired(Responder, {
    onRedirecting: () => <Loading/>,
});