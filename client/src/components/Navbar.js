import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Caterpillar Machinery Catalog</h1>
        </Link>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            Upload
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <ul>
                <li><Link to="/upload-house">Upload House Model</Link></li>
                <li><Link to="/upload-structural">Upload Structural Model</Link></li>
                <li><Link to="/upload-article">Upload Article</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
