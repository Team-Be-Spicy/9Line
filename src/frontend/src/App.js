import './App.css';
import React, {useEffect, useState} from 'react';
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {NavLink, Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Dispatcher from "./route/Dispatcher";
import SWFLogo from "./images/swf-log.png"
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, createTheme, ThemeProvider, Stack, Container, Typography, IconButton} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import NavigationList from "./component/NavigationList";
import Report from "./route/Report";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const default_links = [
    {id: 0, title: "Submit a Request", path: "/"}
]

const responder_links = [
    {id: 0, title: "Submit a Request", path: "/"},
    {id: 1, title: "Responder", path: "/responder"},
    {id: 3, title: "Report", path: "/report"}
];
const dispatcher_links = [
    {id: 0, title: "Submit a Request", path: "/"},
    {id: 2, title: "Dispatcher", path: "/dispatcher"},
    {id: 3, title: "Report", path: "/report"}
];

const App = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();
    const [userName, setUserName] = useState("");
    const [links, setLinks] = useState(default_links);
    const [mode, setMode] = React.useState('light');

    useEffect(() => {
        setUserName(isAuthenticated ? user.name : "");
        if (user && user.name) {
            setLinks(user.name.startsWith("responder") ? responder_links : user.name.startsWith("dispatcher") ? dispatcher_links : default_links);
        }
    }, [isAuthenticated])

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor="background.default" height="100%" minHeight="100vh" paddingBottom="5px">
                <AppBar sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: '60px',
                    backgroundColor: 'background.default',
                    position: 'sticky',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                        <Stack direction="row">
                            <MenuIcon sx={{cursor: 'pointer', margin: '12px', color: "#737373"}}
                                      onClick={() => setIsDrawerOpen(true)}>Test</MenuIcon>
                            <Drawer
                                anchor='left'
                                open={isDrawerOpen}
                                onClose={() => setIsDrawerOpen(false)}>
                                <NavigationList
                                    links={links}
                                    user={user}
                                    isAuthenticated={isAuthenticated}
                                    loginWithRedirect={loginWithRedirect}
                                    logout={logout}
                                    hideDrawer={() => setIsDrawerOpen(false)}/>
                            </Drawer>
                            <NavLink id="appBarLogo" to="/" style={{marginLeft: "20px"}}>
                                <img src={SWFLogo} alt={"swf logo"}/>
                            </NavLink>
                        </Stack>

                        <Stack direction="row" alignItems="center" paddingRight="20px">
                            <Typography color="text.primary" style={{paddingRight: '12px'}}>{userName}</Typography>
                            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon/> :
                                    <Brightness4Icon sx={{color: 'black'}}/>}
                            </IconButton>
                        </Stack>
                </AppBar>
                <Routes>
                    <Route path="/" element={<Requester/>}/>
                    <Route path="/responder"
                           element={<Responder/>}/>
                    <Route path="/dispatcher" element={<Dispatcher/>}/>
                    <Route path="/report" element={<Report/>}/>
                </Routes>
            </Box>
        </ThemeProvider>

    );
}

export default App;



