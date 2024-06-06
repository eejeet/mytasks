import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Link } from "react-router-dom";
import Header from "./Layout/Header";

const Layout = (props) => {
    return (
        <div>
            <Header />
            <main className="container mt-4">{props.children}</main>

            <footer className="bg-dark text-white p-3 mt-4">
                <p>&copy; My Website. All rights reserved.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="#">Privacy Policy</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">Terms of Service</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">FAQ</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

export default Layout;
