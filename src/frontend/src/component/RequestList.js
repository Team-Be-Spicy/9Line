import "./RequestList.css";

import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import {Stack} from "@mui/material";
import {data} from "../Dummy-data";

const RequestList = ({user, requests, onActionClicked, onViewSelected, setMapLocation}) => {

    const [selectedRequestIds, setSelectedRequestIds] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const statusColumn = {
        field: "status",
        headerName: "Status",
        headerClassName: "colHeader",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
    };
    const dispatcherColumns = [
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
            field: "precedence",
            headerName: "Precedence",
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

            <DataGrid
                onCellClick={(params, event) => {
                    if (params.field === 'location') {
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
    );

}

export default RequestList;