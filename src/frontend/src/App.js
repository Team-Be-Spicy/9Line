import './App.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
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
import MenuIcon from '@mui/icons-material/Menu';

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
                <div>
                    <MenuIcon sx={{cursor: 'pointer', margin: '12px'}} onClick={()=>setIsDrawerOpen(true)}>Test</MenuIcon>
                    <Drawer
                        anchor='left'
                        open={isDrawerOpen}
                        onClose={()=>setIsDrawerOpen(false)}>
                        {list()}
                    </Drawer>
                </div>

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



