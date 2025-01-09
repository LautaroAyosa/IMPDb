import React from 'react'
import { NavLink } from 'react-router-dom';


const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                <h3>About Us</h3>
                <p>
                    Discover and share blogs from various categories. Explore content that matches your interests!
                </p>
                </div>
                <div className="footer-section links">
                <h3>Quick Links</h3>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><a href="https://github.com/LautaroAyosa/BlogList" target='_target'><i className='fa-brands fa-github'></i> Github Repository</a></li>
                </ul>
                </div>
                <div className="footer-section contact">
                <h3>Contact Me</h3>
                <ul>
                    <li>Creator: Lautaro Ayosa</li>
                    <li>Email: lautaro@airesdesigns.net</li>
                </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Lautaro Ayosa. All rights reserved.</p>
            </div>
        </footer>

    )
}

export default Footer;