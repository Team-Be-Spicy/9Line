import "./RequestList.css";

import {DataGrid} from "@mui/x-data-grid";

const statusColumn = {
    field: "status",
    headerName: "Status",
    headerClassName: "colHeader",
    headerAlign: "center",
    align: "right"
};
const dispatcherColumns = [
    {
        field: "location",
        headerName: "Location",
        headerClassName: "colHeader",
        headerAlign: "center",
        align: "right"
    },
    {
        field: "callSign",
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
    }
];

const RequestList = ({user, requests}) => {

    const getColumns = () => user === "responder" ? [statusColumn, ...dispatcherColumns] : dispatcherColumns;

    const getRows = () => requests && requests.map(request => {
            return {
                id: request.id,
                status: request.status,
                location: request.location,
                callSign: request.callSign,
                precedence: request.precedence,
                equipment: request.equipment,
                security: request.security,
                marking: request.marking,
                details: request.details
            }
        });

    return (
        <div>
            <div>Requests</div>
            <div className="RequestList">
                <DataGrid
                    columns={getColumns()}
                    rows={getRows()}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );

}

export default RequestList;