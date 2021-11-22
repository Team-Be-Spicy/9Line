import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import WelcomePage from "./route/WelcomePage";
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {testBackend} from "./service/service";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dispatcher from "./route/Dispatcher";

const App = () => {
    const [successMessage, setSuccessMessage] = React.useState({left: false});
    useEffect(() => {
        testBackend().then((res) => {
            setSuccessMessage(res.data);
        }).catch((e) => {
            console.log(e);
        });
    }, []);


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setSuccessMessage({...successMessage, [anchor]: open});
    };

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
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

            </List>
            <Divider/>
        </Box>
    );

    return (
        <div>
            {['\u2630'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={successMessage[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}

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



