import "./RequestList.css";

import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import {Stack, Typography} from "@mui/material";
import {data} from "../Dummy-data";
import Box from "@mui/material/Box";

const RequestList = ({user, requests, onActionClicked, onViewSelected, haveCheckbox, setMapLocation = null}) => {
    const [selectedRequestIds, setSelectedRequestIds] = useState([]);
    const [pageSize, setPageSize] = useState(10);


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

    const getColumns = () => user === "responder" ? columns : [response_column, ...columns];
    ;

    return (
        <div className="RequestList">
            {selectedRequestIds.length > 0 ?
                <Box sx={{backgroundColor: 'rgba(38,255,0,0.1)'}} padding="10px" borderRadius="10px"
                     className="actionButtonContainer">
                    <Typography color="text.primary">{selectedRequestIds.length} selected</Typography>
                    <Button data-cy="btnAction" color="success" variant="outlined" onClick={() => {
                        onActionClicked(selectedRequestIds);
                        setSelectedRequestIds([]);
                    }}>
                        {buttonText}
                    </Button>
                </Box>

                :
                setMapLocation && <Typography color="text.secondary" fontSize="20px" fontWeight="800" textAlign={"center"}>MEDEVAC Request(s)</Typography>}

            <DataGrid
                onCellClick={(params, event) => {
                    if (setMapLocation !== null && params.field === 'location') {
                        setMapLocation(params.formattedValue);
                    }
                }}
                components={{
                    NoRowsOverlay: () => (
                        <Stack color="text.secondary" height="150px" alignItems="center" justifyContent="center">
                            No active requests.
                        </Stack>
                    ),
                    NoResultsOverlay: () => (
                        <Stack color="text.secondary" height="`150px`" alignItems="center" justifyContent="center">
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
                rowsPerPageOptions={[10, 20, 30]}
                pagination
                autoHeight {...getRows()}
            />
        </div>
    );

}

export default RequestList;