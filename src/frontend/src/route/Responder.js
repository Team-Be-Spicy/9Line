import RequestList from "../component/RequestList";

const requests = [{
    id: 1,
    status: "Pending",
    location: "here",
    callSign: "B12",
    precedence: "urgent",
    equipment: "none",
    security: "sdadf",
    marking: "smoke",
    details: "view"
}];

const Responder = () => {
    return (
        <div>
            <RequestList user={"responder"} requests={requests}/>
        </div>
    );
}

export default Responder;