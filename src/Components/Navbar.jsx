import React from "react"
import LogoNavbar from '../assets/logo_navbar.png'
export default function Navbar(){
    return (
    <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
            <a className="navbar-brand" href="#">
                <img srcSet={LogoNavbar} alt="Logo" width="200" height="84"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/About">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#artikel">Article</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#portofolio">Portofolio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#contac">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}