import "./RequestList.css";

import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import {Stack} from "@mui/material";
import {data} from "../Dummy-data";

const RequestList = ({user, requests, onActionClicked, onViewSelected, haveCheckbox, setMapLocation = null}) => {
    const [selectedRequestIds, setSelectedRequestIds] = useState([]);
    const [pageSize, setPageSize] = useState(5);


    const response_column = {
        field: "responder",
        headerName: "Responder",
        headerClassName: "colHeader",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 150,
    };

    const columns = [
        {
            field: "status",
            headerName: "Status",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "location",
            headerName: "Location",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "callSign",
            headerName: "Call Sign",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "totalPatients",
            headerName: "Total Patients",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "equipment",
            headerName: "Special Equipment",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 170,
        },
        {
            field: "security",
            headerName: "Security",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 180,
        },
        {
            field: "marking",
            headerName: "Marking",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "details",
            headerName: "Details",
            headerClassName: "colHeader",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            renderCell: (param) => (
                <Button onClick={() => onViewSelected(param.id)}>VIEW</Button>
            )
        }
    ];

    const buttonText = user === "responder" ? "Mark as Complete" : "Assign";

    const getRows = () => requests && requests.map(request => {
        return {
            id: request.id,
            responder: request.responder,
            status: request.status,
            location: request.location,
            callSign: request.callSign,
            totalPatients: request.urgent + request.urgentSurgical + request.routine + request.priority,
            equipment: request.equipment,
            security: request.security,
            marking: request.marking,
        }
    });

    const getColumns = () => user === "responder" ? columns : [response_column,...columns];;

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

            <DataGrid
                onCellClick={(params, event) => {
                    if (setMapLocation !== null  && params.field === 'location') {
                        setMapLocation(params.formattedValue);
                    }
                }}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="150px" alignItems="center" justifyContent="center">
                            No active requests.
                        </Stack>
                    ),
                    NoResultsOverlay: () => (
                        <Stack height="`150px`" alignItems="center" justifyContent="center">
                            Local filter returns no result
                        </Stack>
                    )
                }}
                style={{border: 0}}
                columns={getColumns()}
                checkboxSelection={haveCheckbox}
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
    );

}

export default RequestList;