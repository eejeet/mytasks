import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Notification from "./../pages/Notification";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //useEffect to check if user is logged in
    useEffect(() => {
        // Check if user is logged in
        // You can add your logic here to check if the user is logged in
        // For example, you can check if the token exists in local storage
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        // Redirect to login page
        window.location.href = "/login";
    };

    const renderAuthLinks = () => {
        if (isLoggedIn) {
            return (
                <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            );
        } else {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            );
        }
    };

    return (
        <header className="bg-primary text-white p-1">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        My Tasks
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">
                                    Tasks
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/notifications">
                                    Notification
                                </Link>
                            </li>

                            {renderAuthLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
