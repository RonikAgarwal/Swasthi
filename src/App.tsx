import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CompanyDashboard from './components/CompanyDashboard';
import HealthOfficialDashboard from './components/HealthOfficialDashboard';
import DHCinput from './components/DHCinput';
import DHCoutput from './components/DHCoutput';
import DHC from './components/DHC';

function App() {
  const [showCompanyLogin, setShowCompanyLogin] = useState(false);
  const [showHealthLogin, setShowHealthLogin] = useState(false);
  const [companyLoggedIn, setCompanyLoggedIn] = useState(false);
  const [healthLoggedIn, setHealthLoggedIn] = useState(false);

  const handleCompanyLoginClick = () => setShowCompanyLogin(true);
  const handleHealthLoginClick = () => setShowHealthLogin(true);

  const handleCompanyLoginSubmit = () => {
    setShowCompanyLogin(false);
    setCompanyLoggedIn(true);
  };
  const handleHealthLoginSubmit = () => {
    setShowHealthLogin(false);
    setHealthLoggedIn(true);
  };

  const handleLogout = () => {
    setCompanyLoggedIn(false);
    setHealthLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onCompanyLogin={handleCompanyLoginClick}
              onHealthLogin={handleHealthLoginClick}
              showCompanyLogin={showCompanyLogin}
              showHealthLogin={showHealthLogin}
              onCompanyLoginSubmit={handleCompanyLoginSubmit}
              onHealthLoginSubmit={handleHealthLoginSubmit}
              onCloseCompanyLogin={() => setShowCompanyLogin(false)}
              onCloseHealthLogin={() => setShowHealthLogin(false)}
            />
          }
        />
        <Route
  path="/company"
  element={
    companyLoggedIn ? (
      <CompanyDashboard onLogout={handleLogout} />
    ) : (
      <LandingPage
        onCompanyLogin={handleCompanyLoginClick}
        onHealthLogin={handleHealthLoginClick}
        showCompanyLogin={showCompanyLogin}
        showHealthLogin={showHealthLogin}
        onCompanyLoginSubmit={handleCompanyLoginSubmit}
        onHealthLoginSubmit={handleHealthLoginSubmit}
        onCloseCompanyLogin={() => setShowCompanyLogin(false)}
        onCloseHealthLogin={() => setShowHealthLogin(false)}
      />
    )
  }
/>
        <Route
          path="/health"
          element={
            healthLoggedIn ? (
              <HealthOfficialDashboard />
            ) : (
              <LandingPage
                onCompanyLogin={handleCompanyLoginClick}
                onHealthLogin={handleHealthLoginClick}
                showCompanyLogin={showCompanyLogin}
                showHealthLogin={showHealthLogin}
                onCompanyLoginSubmit={handleCompanyLoginSubmit}
                onHealthLoginSubmit={handleHealthLoginSubmit}
                onCloseCompanyLogin={() => setShowCompanyLogin(false)}
                onCloseHealthLogin={() => setShowHealthLogin(false)}
              />
            )
          }
        />
        <Route path="/dhcoutput/:employeeId" element={<DHCoutput />} />
        <Route path="/register/:employeeId" element={<DHCinput />} />
        <Route path="/dhc/:swasthiId" element={<DHC />} />
      </Routes>
    </Router>
  );
}

export default App;