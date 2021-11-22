import "./RequestList.css";

import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {fetchRequests} from "../service/service";

const RequestList = ({user}) => {

    const [requests, setRequests] = useState([]);

    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {

        // fetchRequests(user)
        //     .then(res => setRequests(res.data));
        setRequests([{
            id: 1,
            status: "Pending",
            location: "here",
            callsign: "B12",
            precedence: "urgent",
            equipment: "none",
            security: "sdadf",
            marking: "smoke",
            details: "view"
        }]);

    }, []);

    useEffect(() => {
        buildDataGrid();
    }, [requests])

    const buildDataGrid = () => {
        if (user === "responder") {
            setCols([
                {
                    field: "status",
                    headerName: "Status",
                    headerClassName: "colHeader",
                    headerAlign: "center",
                    align: "right"
                }
            ]);
        }

        let colWidth = 120;

        setCols(prevCols => [...prevCols,
            {
                field: "location",
                headerName: "Location",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
            {
                field: "callsign",
                headerName: "Call Sign",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
            {
                field: "precedence",
                headerName: "Precedence",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
            {
                field: "equipment",
                headerName: "Special Equipment",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
            {
                field: "security",
                headerName: "Security",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
            {
                field: "marking",
                headerName: "Marking",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
            {
                field: "details",
                headerName: "Details",
                headerClassName: "colHeader",
                headerAlign: "center",
                align: "right"
            },
        ]);

        setRows(requests.map(request => {
            return {
                id: request.id,
                status: request.status,
                location: request.location,
                callsign: request.callsign,
                precedence: request.precedence,
                equipment: request.equipment,
                security: request.security,
                marking: request.marking,
                details: request.details
            }
        }));
    }

    return (
        <div>
            <div>Requests</div>
            <div className="RequestList">
                <DataGrid
                    columns={cols}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );

}

export default RequestList;