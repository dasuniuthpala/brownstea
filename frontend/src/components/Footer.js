import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Adjust path as needed
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand section */}
          <div>
            <h3 className="footer-brand">Browns Tea</h3>
            <p className="footer-description">
              Bringing the world's finest teas to your cup, one blend at a time.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://pinterest.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">
                  <span className="link-bullet"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/teas" className="footer-link">
                  <span className="link-bullet"></span>
                  Our Teas
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="footer-link">
                  <span className="link-bullet"></span>
                  Brew Guides
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="footer-link">
                  <span className="link-bullet"></span>
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <span className="link-bullet"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-links">
              <div className="contact-item">
                <MdLocationOn className="contact-icon" />
                <span>123 Tea Street, Tea City, TC 12345</span>
              </div>
              <div className="contact-item">
                <MdPhone className="contact-icon" />
                <span>(123) 456-7890</span>
              </div>
              <div className="contact-item">
                <MdEmail className="contact-icon" />
                <span>info@brownstea.com</span>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="footer-heading">Newsletter</h3>
            <p className="footer-description">Subscribe for tea tips and exclusive offers</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="newsletter-input"
              />
              
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Browns Tea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;