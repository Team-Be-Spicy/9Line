import './App.css';
import React, {useState} from 'react';
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Dispatcher from "./route/Dispatcher";
import SWFLogo from "./images/swf-log.png"

import MenuIcon from '@mui/icons-material/Menu';
import {AppBar} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import NavigationList from "./component/NavigationList";
import ReportMap from "./component/ReportMap";

const App = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout} = useAuth0();

    return (
        <div>
            <AppBar sx={{
                display: "flex",
                flexDirection: "row",
                height: '60px',
                backgroundColor: '#F7F7F7',
                position: 'relative',
                alignItems: 'center',
                marginBottom: '20px'
            }}>

                <MenuIcon sx={{cursor: 'pointer', margin: '12px', color: "#737373"}}
                          onClick={() => setIsDrawerOpen(true)}>Test</MenuIcon>
                <Drawer
                    anchor='left'
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}>
                    <NavigationList
                        links={[{id: 0, title: "Submit a Request", path: "/"},
                            {id: 1, title: "Responder", path: "/responder"},
                            {id: 2, title: "Dispatcher", path: "/dispatcher"},
                            {id: 3, title: "Report", path: "/report"}
                        ]}
                        isAuthenticated={isAuthenticated}
                        loginWithRedirect={loginWithRedirect}
                        logout={logout}
                        hideDrawer={() => setIsDrawerOpen(false)}/>
                </Drawer>


                <Box sx={{marginLeft: '20px'}}>
                    <img src={SWFLogo} alt={"swf logo"}/>
                </Box>
            </AppBar>
            <Routes>
                <Route path="/" element={<Requester/>}/>
                <Route path="/report-map" element={<ReportMap/>}/>
                <Route path="/responder" element={<Responder/>}/>
                <Route path="/dispatcher" element={<Dispatcher/>}/>
            </Routes>
        </div>
    );
}

export default App;



