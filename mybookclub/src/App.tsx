import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './routes/LandingPage/LandingPage';
import About from './routes/About/AboutPage';
import LoginPage from './routes/Auth/LoginPage';
import SignupPage from './routes/Auth/SignupPage';
import BookDetail from './routes/BookDetail/BookDetail';
import Profile from './routes/Profile/ProfilePage';
import Community from './routes/Community/Community';
import './styles/global.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
  )
};
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;