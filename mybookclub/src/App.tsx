import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './routes/Layout/Header';
import Footer from './routes/Layout//Footer';
import Home from './pages/Home';
import BookList from './pages/BookList';
import Community from './pages/Community';
import Intro from './pages/Intro';
import Notice from './pages/Notice';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/Notice" element={<Notice />} />
          <Route path="/community" element={<Community />} />
          {/* 필요한 다른 라우트들을 추가하세요 */}
        </Routes>
        <Footer />
      </div>
    </Router>
   
  );
}

export default App;
