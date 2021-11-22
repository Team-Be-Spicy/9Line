import './App.css';
import Button from '@mui/material/Button';
import WelcomePage from "./route/WelcomePage";
import Requester from "./route/Requester";
import Responder from "./route/Responder";
import {Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {testBackend} from "./service/service";
import DetailModal from "./component/DetailModal";


const App = () => {

  return (
    <div>
        <Link to="/">Welcome Page</Link>
        <Link to="/requester">Requester Page</Link>
        <Link to="/responder">Responder Page</Link>
        <DetailModal/>


        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/requester" element={<Requester />} />
            <Route path="/responder" element={<Responder />} />
        </Routes>
    </div>
  );
}

export default App;
