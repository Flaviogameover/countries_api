import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export const Header = ({ darkMode, setDarkMode }) => {
    return (
        <header className={darkMode ? "darkmode-light" : ""}>
            <div className="header-desktop">
                <div className="header-title">
                    <h2>Where in the world ?</h2>
                </div>
                <div
                    onClick={() => setDarkMode(!darkMode)}
                    className="header-darkmode"
                >
                    {!darkMode ? <FaMoon /> : <FaSun />}
                    <p>Dark Mode</p>
                </div>
            </div>
        </header>
    );
};
