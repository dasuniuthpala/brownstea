import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './Header.css';
import logo from '../logo.png'; // Using the existing logo in src directory

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/teas">Our Teas</Link></li>
          <li><Link to="/plantations">Plantations</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
        </ul>
      </nav>
      <div className="header-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
        </Link>
        <Link to="/login" className="login-icon">
          <FaUser />
        </Link>
      </div>
    </header>
  );
};

export default Header;