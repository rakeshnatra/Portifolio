// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './main.tsx';
import RakeshVarma from './rakeshVarma.tsx'; // Import with the correct filename

function App() {
  return (
    <Router>
      <Dashboard /> {/* This renders the navigation */}
      
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/rakesh" element={<RakeshVarma />} /> {/* Use the capitalized component */}
      </Routes>
    </Router>
  );
}

export default App;
