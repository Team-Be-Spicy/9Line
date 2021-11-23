import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, MenuItem, Select,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {updateResponder} from "../service/service";
import {useState} from "react";


const AssignResponderModal = ({open, handleClose, data, ...other}) => {

    const [selectedResponder, setSelectedResponder] = useState('');

    const assignResponder = () => {
        data.forEach(request => {
            updateResponder(request,selectedResponder).then();
        })
        handleClose();
    }

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
            <DialogContent
                dividers sx={{alignContent:"center"}}>
                <Select
                    onChange={(e) => setSelectedResponder(e.target.value)}
                    sx={{width: '100%'}} >
                    <MenuItem value='Responder One'>
                        Responder One
                    </MenuItem>
                    <MenuItem value='Responder Two'>
                        Responder Two
                    </MenuItem>
                </Select>

            </DialogContent>
            {<DialogActions>
                <Button color={"success"} onClick={assignResponder}> <Typography
                    fontWeight={"bold"}> ASSIGN </Typography> </Button>
                <Button color={"success"} onClick={handleClose}> <Typography
                    fontWeight={"bold"}> CANCEL </Typography> </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default AssignResponderModal;