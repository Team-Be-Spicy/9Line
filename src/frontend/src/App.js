import './App.css';
import Button from '@mui/material/Button';
import WelcomePage from "./route/WelcomePage";
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {testBackend} from "./service/service";
import Dispatcher from "./route/Dispatcher";

const App = () => {

  return (
    <div>
        <Link to="/">Welcome Page</Link>
        <Link to="/requester">Requester Page</Link>
        <Link to="/responder">Responder Page</Link>
        <Link to="/dispatcher">Dispatcher Page</Link>

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
