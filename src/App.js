import { Header, Home, Country } from "./components/index";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        let el_body = document.querySelector("body");
        el_body.className = darkMode ? "darkmode-bg" : "";
    }, [darkMode]);

    return (
        <BrowserRouter>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route
                    path="/:country"
                    element={<Country darkMode={darkMode} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
