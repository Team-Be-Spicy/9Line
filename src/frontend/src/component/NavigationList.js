import React from 'react';
import {Stack} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";

const NavigationList = ({links, isAuthenticated, loginWithRedirect, logout, hideDrawer}) =>
    <Stack
        sx={{height: "100vh", width: 250}}
        justifyContent="space-between"
        role="presentation"
    >
        <List onClick={hideDrawer}>
            {links.map(link =>
                <ListItem key={link.id}>
                    <NavLink
                        to={link.path}
                        className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                    >{link.title}
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