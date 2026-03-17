// Main app component for the Mission 11 UI

import React from 'react'
import './App.css'
import Header from './Header';
import BooksList from './booksList';

function App() {
  return (
    <>
      {/* Static page heading/content */}
      <Header/>
      {/* Interactive table with sorting + pagination */}
      <BooksList/>
    </>
  )
};

export default App;