import {Box, Typography} from "@mui/material";

const ModalRow = ({label, value}) =>
    <Box sx={{display: 'flex', alignItems:"baseline"}}  marginBottom='6px' >
        <Box sx={{display:"flex", justifyContent:"end", width:'40%', marginRight:'10px'}}>
            <Typography sx={{textAlign: "right"}} fontWeight={'bolder'} fontSize={"14px"} >
                {label}
            </Typography>
        </Box>
        <Box sx={{display:"flex", width:'60%'}}>
           <Typography fontSize={"16px"}>
               {value}
           </Typography>
        </Box>
    </Box>


export default ModalRow;

