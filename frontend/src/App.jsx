// Main App component - renders the header and bowler table

import React from 'react'
import './App.css'
import Header from './Header';
import BooksList from './booksList';

function App() {
  return (
    <>
      {/* Page heading describing the app */}
      <Header/>
      {/* Table of bowlers fetched from the API */}
      <BooksList/>
    </>
  )
};

export default App;