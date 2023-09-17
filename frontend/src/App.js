import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./styles/App.scss"

import Home from "./pages/Home"
import Streamer from "./pages/Streamer"

function App() {
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