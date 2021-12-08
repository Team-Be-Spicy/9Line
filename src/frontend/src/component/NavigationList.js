import React from 'react';
import {Stack, Typography} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SWFLogo from "../images/swf-log.png";

const NavigationList = ({links, isAuthenticated, loginWithRedirect, logout, hideDrawer}) =>
    <Stack
        sx={{height: "100vh", width: 250}}
        justifyContent="space-between"
        role="presentation"
    >

        <List onClick={hideDrawer}>
            <NavLink id="navMenuLogo" to="/" style={{marginLeft: "20px"}}>
                <img src={SWFLogo} alt={"swf logo"}/>
            </NavLink>
            {links.map(link =>
                <ListItem key={link.id}>
                    <NavLink
                        to={link.path}
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    ><Typography color={'text.primary'}>{link.title}</Typography>
                    </NavLink>
                </ListItem>)}
        </List>
        {isAuthenticated ?
            <Button onClick={() => {
                hideDrawer();
                logout({returnTo: window.location.origin});
            }}>Logout</Button>
            :
            <Stack
                sx={{padding: "5px"}}
                alignItems="center">
                <p>Dispatchers and Responders</p>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    onClick={hideDrawer}>
                    <Button className="login-btn" onClick={() => loginWithRedirect()}>Login</Button>
                    <Button onClick={() => loginWithRedirect({screen_hint: 'signup'})}>Register</Button>
                </Stack>
            </Stack>}
    </Stack>;

export default NavigationList;