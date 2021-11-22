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


const DetailModal = ({button1Label, button2Label, button1Action, button2Action, open, handleClose, ...other}) => {


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
                <ModalRow label="Status" value="John Doe"/>
                <ModalRow label='Location' value="10TQS1234567890"/>
                <ModalRow label="Call Sign" value="John Doe"/>
                <ModalRow label="Number of Patients" value="John Doe"/>
                <ModalRow label="Precedence" value="John Doe"/>
                <ModalRow label="Special Equipment" value="Ventilator, Extracttion Equipment, Hoist"/>
                <ModalRow label="Litter Patients" value="John Doe"/>
                <ModalRow label="Ambulatory Patients" value="John Doe"/>
                <ModalRow label="Security at Pick-up site" value="John Doe"/>
                <ModalRow label="Method of Marking" value="John Doe"/>
                <ModalRow label="Patient Nationality and status" value="John Doe"/>
                <ModalRow label="NBC Contamination" value="John Doe"/>

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