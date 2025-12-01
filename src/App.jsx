import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CampaignPage from './pages/CampaignPage';
import ReportPage from './pages/ReportPage';
import ManageBuzzerPage from './pages/ManageBuzzerPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);

  // Fungsi untuk navigasi ke halaman baru
  const navigateTo = (page) => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage(page);
  };

  // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setCurrentPage(previousPage);
      setPageHistory(pageHistory.slice(0, -1));
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={navigateTo} />;
      case 'register':
        return <RegisterPage setCurrentPage={navigateTo} goBack={goBack} />;
      case 'login':
        return <LoginPage setCurrentPage={navigateTo} goBack={goBack} />;
      case 'campaign':
        return <CampaignPage setCurrentPage={navigateTo} goBack={goBack} />;
      case 'report':
        return <ReportPage setCurrentPage={navigateTo} goBack={goBack} />;
      case 'manage':
        return <ManageBuzzerPage setCurrentPage={navigateTo} goBack={goBack} />;
      default:
        return <HomePage setCurrentPage={navigateTo} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;