import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, MenuItem, Select,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'

const AssignResponderModal = ({responders, open, handleClose, assignResponder, setSelectedResponder, selectedResponder}) => {

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
                    defaultValue={selectedResponder}
                    onChange={(e) => setSelectedResponder(e.target.value)}
                    sx={{width: '100%'}} >
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
                </Select>

            </DialogContent>
            {<DialogActions>
                <Button data-cy="btnAssign" color={"success"} onClick={assignResponder}> <Typography
                    fontWeight={"bold"}> ASSIGN </Typography> </Button>
                <Button color={"success"} onClick={handleClose}> <Typography
                    fontWeight={"bold"}> CANCEL </Typography> </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default AssignResponderModal;