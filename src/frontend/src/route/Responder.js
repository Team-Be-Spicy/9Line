import RequestList from "../component/RequestList";
import "./Responder.css";
import {useEffect, useState} from "react";
import {fetchRequests, updateStatus} from "../service/service";

const Responder = () => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests().then(res => setRequests(res.data));
    }, []);

    const onViewClicked = (param) => {
        alert(param);
    };

    const handleMarkComplete = (selectedIds) => {
        selectedIds.forEach(async id => {
            await updateStatus(id)
        })
        fetchRequests().then(res => setRequests(res.data));
    };

    return (
        <div className="Responder">
            <div className="requestListContainer">
                <h1>MEDEVAC Assignment</h1>
                <RequestList user="responder" requests={requests} onActionClicked={handleMarkComplete}
                             onViewSelected={onViewClicked}/>
            </div>
        </div>
    );
}

export default Responder;