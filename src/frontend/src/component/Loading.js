import {CircularProgress, Stack} from "@mui/material";

const Loading = () =>

    <Stack
        sx={{height: "100vh"}}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}>
        <CircularProgress color="success"/>
        <h1>Loading...</h1>
    </Stack>;


export default Loading;