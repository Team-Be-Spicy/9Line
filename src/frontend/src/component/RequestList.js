import "./RequestList.css";

import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {useState} from "react";


const RequestList = ({user, requests, onActionClicked, onViewSelected}) => {

    const [selectedRequestIds, setSelectedRequestIds] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const statusColumn = {
        field: "status",
        headerName: "Status",
        headerClassName: "colHeader",
        headerAlign: "center",
        align: "center",
        flex: 1
    };
    const dispatcherColumns = [
        {
            field: "location",
            headerName: "Location",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "callSign",
            headerName: "Call Sign",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "precedence",
            headerName: "Precedence",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "equipment",
            headerName: "Special Equipment",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "security",
            headerName: "Security",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "marking",
            headerName: "Marking",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "details",
            headerName: "Details",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (param) => (
                <Button onClick={() => onViewSelected(param.id)}>VIEW</Button>
            )
        }
    ];

    const buttonText = user === "responder" ? "Mark as Complete" : "Assign";

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
        }
    });
    return (
        <div className="RequestList">
            {selectedRequestIds.length > 0 ?
                        <div className="actionButtonContainer">
                            <p>{selectedRequestIds.length} selected</p>
                            <Button color="success" variant="outlined" onClick={() => {
                                onActionClicked(selectedRequestIds);
                                setSelectedRequestIds([]);
                            }}>
                                {buttonText}
                            </Button>
                        </div>

                :
                <h3>Requests</h3>
            }
            <div className="requestTable" >
                <DataGrid
                    style={{border: 0}}
                    columns={getColumns()}
                    checkboxSelection
                    selectionModel={selectedRequestIds}
                    onSelectionModelChange={params => setSelectedRequestIds(params)}
                    disableSelectionOnClick
                    rows={getRows()}
                    pageSize={pageSize}
                    hideFooterSelectedRowCount
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 25]}
                    pagination
                    autoHeight {...getRows()}


                />
            </div>
        </div>
    );

}

export default RequestList;