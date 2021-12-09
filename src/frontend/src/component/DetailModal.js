import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, MenuItem, Select,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ModalRow from "./ModalRow";


const DetailModal = ({
                         responders,
                         button1Label,
                         button2Label,
                         button1Action,
                         button2Action,
                         open,
                         handleClose,
                         data,
                         isDispatcher,
                         setSelectedResponder,
                         selectedResponder
                     }) => {


    return (
        <Dialog fullWidth onClose={() => {
        }} open={open}>
            <DialogTitle sx={{m: 0, p: 2}}>MEDEVAC Request
                <IconButton
                    data-cy="btnClose"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{alignContent: "center"}}>
                <ModalRow data_cy="detailStatus" label="Status" value={data.status || 'Pending'}/>
                <ModalRow label='Location' value={data.location}/>
                <ModalRow label="Call Sign" value={data.callSign}/>
                <ModalRow label="Urgent" value={data.urgent}/>
                <ModalRow label="Urgent Surgical" value={data.urgentSurgical}/>
                <ModalRow label="Priority" value={data.priority}/>
                <ModalRow label="Routine" value={data.routine}/>
                <ModalRow label="Special Equipment" value={data.equipment}/>
                <ModalRow label="Litter" value={data.litter}/>
                <ModalRow label="Ambulatory" value={data.ambulatory}/>
                <ModalRow label="Security at Pick-up site" value={data.security}/>
                <ModalRow label="Method of Marking" value={data.marking}/>
                <ModalRow label="Nationality and Status" value={data.national}/>
                <ModalRow label="NBC Contamination" value={data.line9}/>
                {isDispatcher && <Select
                    defaultValue={selectedResponder}
                    onChange={(e) => setSelectedResponder(e.target.value)}
                    sx={{width: '100%'}}>
                    {responders && responders.map(responder =>
                        <MenuItem key={responder} value={responder}>{responder}</MenuItem>
                    )}

                    {/*<MenuItem value='responder1@nineline.com'>*/}
                    {/*    Responder One*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem value='responder2@nineline.com'>*/}
                    {/*    Responder Two*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem value='responder3@nineline.com'>*/}
                    {/*    Responder Three*/}
                    {/*</MenuItem>*/}
                        </Select>}
                </DialogContent>
                {(button1Label || button2Label) && <DialogActions>
                    <Button color={"success"} onClick={button1Action}> <Typography
                    fontWeight={"bold"}> {button1Label}  </Typography> </Button>
                    <Button color={"success"} onClick={button2Action}> <Typography
                    fontWeight={"bold"}> {button2Label}  </Typography> </Button>
                    </DialogActions>}
                    </Dialog>
                    )
                }

                export default DetailModal;