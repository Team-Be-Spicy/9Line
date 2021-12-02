import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-h1uk-ini.us.auth0.com"
            clientId="42OUbI4FtCJU11MOUEgil56j05SfHaxf"
            redirectUri={window.location.origin}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
;