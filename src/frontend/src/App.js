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
import {checkUserRole} from "./service/service";

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
    const {
        user,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
        getAccessTokenWithPopup
    } = useAuth0();
    const [loadingText, setLoadingText] = useState("loading default");
    const [userName, setUserName] = useState("");
    const [links, setLinks] = useState(default_links);
    const [mode, setMode] = React.useState('light');
    const dispatcherOptions = {
        scope: "update:requests assign:requests",
        audience: "https://egor-dev.com"
    }
    const responderOptions = {
        scope: "update:requests read:requests",
        audience: "https://egor-dev.com"
    }

    useEffect(async () => {
        setUserName(isAuthenticated && user ? user.name : "");
        if (isAuthenticated) {
            const roles = await getRoles();
            setLinks(roles.includes("SCOPE_assign:requests") ? dispatcher_links : roles.includes("SCOPE_update:requests") ? responder_links : default_links);
        }
    }, [isAuthenticated])

    // Try to get the responder's permissions, if this doesn't work that means the user is not a responder so try dispatcher permissions
    const getRoles = async () => {
        let response = null;
        try {
            // console.log("trying dispatcher permissions");
            const token = await getToken(dispatcherOptions);
            // console.log(token);
            response = await checkUserRole(token);
            // console.log("roles");
            // console.log(response.data);
            if (response && response.data) {
                return response.data
            }
        } catch {
            // either not authenticated or not a responder
        }
        try {
            // console.log("trying responder permissions");
            response = await checkUserRole(await getToken(responderOptions));
        } catch {
            // either not authenticated or not a dispatcher
        }
        return response ? response.data : [];
    }

    // Try to get the token silently first, this should work in production, but doesn't always work in dev.
    const getToken = async (options) => {
        let token = "";
        try {
            token = await getAccessTokenSilently(options);
        } catch {
            token = await getAccessTokenWithPopup(options);
        }
        return token;
    }

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



