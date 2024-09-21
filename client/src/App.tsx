import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ListDetail from './pages/list/ListDetail'
import Navbar from './layout/Navbar';
function App() {

  return (
    <Router>
      <main className='  h-full max-w-[1280px] mx-auto overflow-hidden '>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:slug" element={<ListDetail></ListDetail>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

