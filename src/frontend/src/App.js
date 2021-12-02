import './App.css';
import React, {useState} from 'react';
import WelcomePage from "./route/WelcomePage";
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import Report from "./route/Report";
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

const App = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                <ListItem>
                    <NavLink
                        to="/report"
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    >Report Page</NavLink>
                </ListItem>

            </List>
            <Divider/>
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
                <Route path="/report" element={<Report />} />
            </Routes>
        </div>
    );
}

export default App;



