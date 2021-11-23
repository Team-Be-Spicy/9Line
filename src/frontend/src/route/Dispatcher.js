import React, {useEffect, useState} from 'react';
import RequestList from "../component/RequestList";
import DetailModal from "../component/DetailModal";
import {fetchRequests} from "../service/service";
import AssignResponderModal from "../component/AssignResponderModal";

const Dispatcher = () => {

    const [requests, setRequests] = useState([]);
    const [currentRequest, setCurrentRequest] = useState({});
    const [open, setOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedIDs, setSelectedIDs] = useState([]);

    useEffect(() => {
        fetchRequests().then(res => setRequests(res.data));
    }, []);



    const handleClose = () =>{
        setOpen(false);
    }

    const handleAssignClose = () => {
        setAssignOpen(false);
    }

    const onViewClicked = (param) => {
        setCurrentRequest(requests.find(x => x.id === param));
        setOpen(true);
    }

    const onActionClicked = (checkedIDs) => {
        setSelectedIDs(checkedIDs);
        setAssignOpen(true);
    }

    return (
        <div className={"Dispatcher"}>
            {<AssignResponderModal open={assignOpen} data={selectedIDs} handleClose={handleAssignClose}/>}
            {<DetailModal data={currentRequest} open={open} handleClose={handleClose}/>}
            <RequestList user={"dispatcher"}
                         requests={requests}
                         onActionClicked={onActionClicked}
                         onViewSelected={onViewClicked}/>
        </div>
    );
}


export default Dispatcher;