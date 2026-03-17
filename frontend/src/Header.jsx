// Header component - displays the page title and description

import React from 'react';
import './index.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1>Bookstore</h1>
      <p>Explore all of the books in the bookstore!</p>
    </header>
  );
};

export default Header;