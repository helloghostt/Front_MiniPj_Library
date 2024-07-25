import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./routes/LandingPage/LandingPage";
import About from "./routes/About/AboutPage";
import BookDetail from "./routes/BookDetail/BookDetail";
import Profile from "./routes/Profile/ProfilePage";
import Community from "./routes/Community/Community";
import HomePage from "./routes/Home/HomePage";
import { AppProvider } from "./contexts/AppContext";
import "./styles/global.css";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
