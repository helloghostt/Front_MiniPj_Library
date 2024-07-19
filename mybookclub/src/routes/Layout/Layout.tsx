import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import '../../styles/global.css'




const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;