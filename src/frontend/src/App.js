import './App.css';
import React, {useEffect, useState} from 'react';
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Dispatcher from "./route/Dispatcher";
import SWFLogo from "./images/swf-log.png"
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, Stack} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import NavigationList from "./component/NavigationList";
import Report from "./route/Report";

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

    useEffect(() => {
        setUserName(isAuthenticated ? user.name : "");
        if (user && user.name) {
            setLinks(user.name.startsWith("responder") ? responder_links : user.name.startsWith("dispatcher") ? dispatcher_links : default_links);
        }
    }, [isAuthenticated])

    return (
        <div>
            <AppBar sx={{
                display: "flex",
                flexDirection: "row",
                height: '60px',
                backgroundColor: '#F7F7F7',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
            }}>

                <Stack direction="row">

                    <MenuIcon sx={{cursor: 'pointer', margin: '12px', color: "#737373"}}
                              className="menu-btn"
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


                    <Box sx={{marginLeft: '20px'}}>
                        <img src={SWFLogo} alt={"swf logo"}/>
                    </Box>
                </Stack>

                <p style={{color: 'black', paddingRight: '12px'}}>{userName}</p>

            </AppBar>
            <Routes>
                <Route path="/" element={<Requester/>}/>
                <Route path="/responder"
                       element={<Responder/>}/>
                <Route path="/dispatcher" element={<Dispatcher/>}/>
                <Route path="/report" element={<Report/>}/>
            </Routes>
        </div>
    );
}

export default App;



