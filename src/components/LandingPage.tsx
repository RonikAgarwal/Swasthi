import React, { useState } from 'react';
import DHC from './DHCoutput';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

interface LandingProps {
  onCompanyLogin: () => void;
  onHealthLogin: () => void;
  showCompanyLogin: boolean;
  showHealthLogin: boolean;
  onCompanyLoginSubmit: () => void;
  onHealthLoginSubmit: () => void;
  onCloseCompanyLogin: () => void;
  onCloseHealthLogin: () => void;
}

const LandingPage: React.FC<LandingProps> = ({
  onCompanyLogin,
  onHealthLogin,
  showCompanyLogin,
  showHealthLogin,
  onCompanyLoginSubmit,
  onHealthLoginSubmit,
  onCloseCompanyLogin,
  onCloseHealthLogin,
}) => {
  const [netId, setNetId] = useState('');
  const [password, setPassword] = useState('');
  const [healthId, setHealthId] = useState('');
  const [healthPassword, setHealthPassword] = useState('');
  const [dhcId, setDhcId] = useState('');
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="logo-section">
        <img src="/logo192.png" alt="Swasthi Logo" className="swasthi-logo" />
        <h1 className="swasthi-title">Swasthi</h1>
        <p className="swasthi-tagline">A Digital Health Shield for Migrant Workers</p>
      </div>
      <div className="options-section">
        <button className="landing-btn" onClick={onCompanyLogin}>
          Login as Company Official
        </button>
        <button className="landing-btn" onClick={onHealthLogin}>
          Login as Health Official
        </button>
      </div>
      <div className="id-section">
        <input
          type="text"
          placeholder="Enter Swasthi ID"
          className="id-input"
          value={dhcId}
          onChange={e => setDhcId(e.target.value)}
        />
        <button
          className="landing-btn"
          onClick={() => {
            if (dhcId.trim()) navigate(`/dhc/${dhcId.trim()}`);
          }}
        >
          View DHC
        </button>
      </div>
      <div className="banner-section">
        <h3>Disease Outbreak Alerts</h3>
        <div className="disease-banner">
          <span className="disease-alert">
            COVID-19: 950 <span className="alert-badge">ALERT</span>
          </span>  
          <span>Malaria: 600</span>
          <span>Dengue: 820</span>
          <span>Typhoid: 540</span>
          <span>Chikungunya: 430</span>
          <span>Influenza: 780</span>
        </div>
        <p className="banner-note">
          Publicly visible summary. Real-time alerts highlighted.
        </p>
      </div>
      {showCompanyLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Company Official Login</h2>
            <input
              type="text"
              placeholder="Enter Swasthi NET ID"
              className="modal-input"
              value={netId}
              onChange={e => setNetId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="modal-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="modal-actions">
              <button
                className="landing-btn"
                onClick={() => {
                  onCompanyLoginSubmit();
                  navigate('/company');
                }}
              >
                Sign In
              </button>
              <button className="landing-btn cancel-btn" onClick={onCloseCompanyLogin}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showHealthLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Health Official Login</h2>
            <input
              type="text"
              placeholder="Enter Health Official ID"
              className="modal-input"
              value={healthId}
              onChange={e => setHealthId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="modal-input"
              value={healthPassword}
              onChange={e => setHealthPassword(e.target.value)}
            />
            <div className="modal-actions">
              <button
                className="landing-btn"
                onClick={() => {
                  onHealthLoginSubmit();
                  navigate('/health');
                }}
              >
                Sign In
              </button>
              <button className="landing-btn cancel-btn" onClick={onCloseHealthLogin}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;