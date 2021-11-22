import React from 'react';
import RequestList from "../component/RequestList";

const requests = [
    {
        id: 1,
        status: "Pending",
        location: "here",
        callSign: "B12",
        precedence: "urgent",
        equipment: "none",
        security: "sdadf",
        marking: "smoke",
        details: "view"
    }, {
        id: 2,
        status: "Pending",
        location: "here",
        callSign: "B12",
        precedence: "urgent",
        equipment: "none",
        security: "sdadf",
        marking: "smoke",
        details: "view"
    }, {
        id: 3,
        status: "Pending",
        location: "here",
        callSign: "B12",
        precedence: "urgent",
        equipment: "none",
        security: "sdadf",
        marking: "smoke",
        details: "view"
    }, {
        id: 4,
        status: "Pending",
        location: "here",
        callSign: "B12",
        precedence: "urgent",
        equipment: "none",
        security: "sdadf",
        marking: "smoke",
        details: "view"
    }, {
        id: 5,
        status: "Pending",
        location: "here",
        callSign: "B12",
        precedence: "urgent",
        equipment: "none",
        security: "sdadf",
        marking: "smoke",
        details: "view"
    }, {
        id: 6,
        status: "Pending",
        location: "here",
        callSign: "B12",
        precedence: "urgent",
        equipment: "none",
        security: "sdadf",
        marking: "smoke",
        details: "view"
    }];

const Dispatcher = () => {

    const onRowSelected = (selectedIDs) => {
        alert(selectedIDs);
    }

    const onViewClicked = (param) => {
        alert(param);
    }

    return (
        <div className={"Dispatcher"}>
            <RequestList user={"dispatcher"} requests={requests} onRequestSelected={onRowSelected} onViewSelected={onViewClicked}/>
        </div>
    );
}


export default Dispatcher;