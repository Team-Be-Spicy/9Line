import React, {useEffect, useState} from 'react';
import RequestList from "../component/RequestList";
import DetailModal from "../component/DetailModal";
import {fetchRequests} from "../service/service";

const Dispatcher = () => {

    const [requests, setRequests] = useState([]);
    const [currentRequest, setCurrentRequest] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchRequests().then(res => setRequests(res.data));
    }, []);

    const onRowSelected = (selectedIDs) => {
        alert(selectedIDs);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const onViewClicked = (param) => {
        setCurrentRequest(requests.find(x => x.id === param));
        setOpen(true);
    }

    return (
        <div className={"Dispatcher"}>
            {open && <DetailModal data={currentRequest} open={open} handleClose={handleClose}/>}
            <RequestList user={"dispatcher"} requests={requests} onRequestSelected={onRowSelected} onViewSelected={onViewClicked}/>
        </div>
    );
}


export default Dispatcher;