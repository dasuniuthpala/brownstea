import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaWarehouse, FaMapMarkerAlt, FaTruck, FaCommentDots, FaQuestionCircle } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={closeSidebar}>×</button>
      <h3>Admin Menu</h3>
      <ul className="sidebar-menu">
        <li>
          <Link to="/inventory/products" onClick={closeSidebar}>
            <FaBoxOpen className="menu-icon" /> Product Inventory
          </Link>
        </li>
        <li>
          <Link to="/inventory/wholesale" onClick={closeSidebar}>
            <FaWarehouse className="menu-icon" /> Wholesale Inventory
          </Link>
        </li>
        <li>
          <Link to="/locations" onClick={closeSidebar}>
            <FaMapMarkerAlt className="menu-icon" /> Location
          </Link>
        </li>
        <li>
          <Link to="/delivery" onClick={closeSidebar}>
            <FaTruck className="menu-icon" /> Delivery Management
          </Link>
        </li>
        <li>
          <Link to="/feedback" onClick={closeSidebar}>
            <FaCommentDots className="menu-icon" /> Feedback
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeSidebar}>
            <FaQuestionCircle className="menu-icon" /> Contact Us / FAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
