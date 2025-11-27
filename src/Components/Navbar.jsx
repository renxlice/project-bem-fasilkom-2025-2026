import React, { useState } from "react";
import LogoNavbar from '../assets/logo_navbar.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/About' },
        { label: 'Kegiatan', href: '/#artikel' },
        { label: 'Aspirasi', href: '/aspirasi' },
        { label: 'Contact Us', href: '/#contact' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img src={LogoNavbar} alt="BEM Fasilkom Logo" />
                </a>

                {/* Desktop Menu */}
                <ul className="navbar-menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item">
                            <a className="nav-link" href={item.href}>
                                {item.label}
                            </a>
                            {item.label === 'Contact Us' && (
                                <a
                                    className="menu-logo"
                                    href={item.href}
                                    title="Contact"
                                    aria-label="Open contact"
                                >
                                    <span className="menu-bar" />
                                    <span className="menu-bar" />
                                    <span className="menu-bar" />
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle Button */}
                <button 
                    className="navbar-toggler"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className={`toggler-icon ${isOpen ? 'open' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar-mobile ${isOpen ? 'active' : ''}`}>
                <ul className="navbar-menu-mobile">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item-mobile">
                            <a 
                                className="nav-link-mobile" 
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}