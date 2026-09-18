import { useState, useEffect } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const switchTheme = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const clouds = () => (
        <div className="clouds">
            <i className="fa-solid fa-cloud"></i>
        </div>
    );

    const stars = () => (
        <div className="stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
        </div>
    );

    return (
        <div className="wrapper">
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={switchTheme}
                    checked={theme === 'dark'}
                    aria-label="Cambiar tema claro/oscuro"
                />
                <span className="slider round">
                    {theme === 'light' ? clouds() : stars()}
                    <span className="btnTheme"></span>
                </span>
            </label>
        </div>
    );
};

export default ThemeToggle;
