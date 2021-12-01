import './App.css';
import React, {useState} from 'react';
import WelcomePage from "./route/WelcomePage";
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {NavLink, Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Dispatcher from "./route/Dispatcher";
import SWFLogo from "./images/swf-log.png"

import MenuIcon from '@mui/icons-material/Menu';
import {AppBar} from "@mui/material";
import Button from "@mui/material/Button";
import {useAuth0} from "@auth0/auth0-react";

const App = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={()=>setIsDrawerOpen(false)}
        >
            <List>
                <ListItem>
                    <NavLink
                        to="/"
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    >
                        Welcome Page</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        to="/requester"
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    >Requester Page</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        to="/responder"
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    >Responder Page</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink
                        to="/dispatcher"
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    >Dispatcher Page</NavLink>
                </ListItem>

            </List>
            <Divider/>
            {isAuthenticated ?
                <Button onClick={() => logout()}>Logout</Button>
                :
                <Button onClick={() => loginWithRedirect()}>Login</Button>
            }

        </Box>
    );

    return (
        <div>
            <AppBar sx={{display:"flex",flexDirection:"row", height:'60px', backgroundColor:'#F7F7F7', position:'relative', alignItems:'center', marginBottom:'20px'}}>

                    <MenuIcon sx={{cursor: 'pointer', margin: '12px', color:"#737373"}} onClick={()=>setIsDrawerOpen(true)}>Test</MenuIcon>
                        <Drawer
                            anchor='left'
                            open={isDrawerOpen}
                            onClose={()=>setIsDrawerOpen(false)}>
                            {list()}
                        </Drawer>


                <Box sx={{marginLeft: '20px'}}>
                    <img src={SWFLogo} alt={"swf logo"}/>
                </Box>
        </AppBar>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/requester" element={<Requester />} />
                <Route path="/responder" element={<Responder />} />
                <Route path="/dispatcher" element={<Dispatcher />} />
            </Routes>
        </div>
    );
}

export default App;



