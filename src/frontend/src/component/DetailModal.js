import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ModalRow from "./ModalRow";


const DetailModal = ({button1Label, button2Label, button1Action, button2Action, open, handleClose, data, ...other}) => {


    return (
        <Dialog fullWidth onClose={() => {
        }} open={open}>
            <DialogTitle sx={{ m: 0, p: 2 }}>MEDEVAC Request
            <IconButton
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
            <DialogContent dividers sx={{alignContent:"center"}}>
                <ModalRow label="Status" value={data.status || 'Pending'}/>
                <ModalRow label='Location' value={data.location}/>
                <ModalRow label="Call Sign" value={data.callSign}/>
                <ModalRow label="Number of Patients" value={data.totalPatient}/>
                <ModalRow label="Precedence" value={data.precedence}/>
                <ModalRow label="Special Equipment" value={data.equipment}/>
                <ModalRow label="Litter Patients" value={data.litter}/>
                <ModalRow label="Ambulatory Patients" value={data.ambulatory}/>
                <ModalRow label="Security at Pick-up site" value={data.security}/>
                <ModalRow label="Method of Marking" value={data.marking}/>
                <ModalRow label="Patient Nationality and status" value={data.national}/>
                <ModalRow label="NBC Contamination" value={data.line9}/>

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