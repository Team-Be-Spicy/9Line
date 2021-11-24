import './App.css';
import React, {useState} from 'react';
import WelcomePage from "./route/WelcomePage";
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {Link, Route, Routes} from "react-router-dom";
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
                    <Link
                        to="/"
                        style={{textDecoration: 'none'}}
                    >
                        Welcome Page</Link>
                </ListItem>
                <ListItem>
                    <Link
                        to="/requester"
                        style={{textDecoration: 'none'}}
                    >Requester Page</Link>
                </ListItem>
                <ListItem>
                    <Link
                        to="/responder"
                        style={{textDecoration: 'none'}}
                    >Responder Page</Link>
                </ListItem>
                <ListItem>
                    <Link
                        to="/dispatcher"
                        style={{textDecoration: 'none'}}
                    >Dispatcher Page</Link>
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

            </Routes>
        </div>
    );
}

export default App;



