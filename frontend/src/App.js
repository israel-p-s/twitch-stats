import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from 'react';

import "./styles/App.scss"

import Home from "./pages/Home"
import Streamer from "./pages/Streamer"

function App() {

    useEffect(() => {
        document.title = 'Twitch Stats';
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/streamer/:streamer" element={<Streamer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App; 