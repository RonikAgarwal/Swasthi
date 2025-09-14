import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthOfficialDashboard.css';

const companies = [
  { id: 'C1', name: 'Acme Corp' },
  { id: 'C2', name: 'Globex Ltd' },
  { id: 'C3', name: 'Initech' },
  { id: 'C4', name: 'Umbrella Inc' },
  { id: 'C5', name: 'Wayne Enterprises' },
  { id: 'C6', name: 'Stark Industries' },
];

const employeesData = [
  { companyId: 'C1', id: 'EMP001', swasthiId: 'SW001', place: 'Delhi', hospital: 'Apollo' },
  { companyId: 'C1', id: 'EMP002', swasthiId: '', place: 'Delhi', hospital: 'Fortis' },
  { companyId: 'C2', id: 'EMP101', swasthiId: 'SW101', place: 'Mumbai', hospital: 'Lilavati' },
  { companyId: 'C2', id: 'EMP102', swasthiId: '', place: 'Mumbai', hospital: 'Nanavati' },
  { companyId: 'C3', id: 'EMP201', swasthiId: 'SW201', place: 'Bangalore', hospital: 'Manipal' },
  { companyId: 'C3', id: 'EMP202', swasthiId: '', place: 'Bangalore', hospital: 'Columbia Asia' },
  { companyId: 'C4', id: 'EMP301', swasthiId: 'SW301', place: 'Chennai', hospital: 'Apollo' },
  { companyId: 'C5', id: 'EMP401', swasthiId: '', place: 'Pune', hospital: 'Ruby Hall' },
  { companyId: 'C6', id: 'EMP501', swasthiId: 'SW501', place: 'Hyderabad', hospital: 'Yashoda' },
];

// Dummy disease data for the tally/bar chart
const diseaseStats = [
  { disease: 'Dengue', infected: 820, cured: 700, dead: 22 },
  { disease: 'Malaria', infected: 610, cured: 590, dead: 15 },
  { disease: 'COVID-19', infected: 950, cured: 900, dead: 38 },
  { disease: 'Typhoid', infected: 540, cured: 520, dead: 10 },
  { disease: 'Chikungunya', infected: 430, cured: 400, dead: 12 },
  { disease: 'Diarrhea', infected: 780, cured: 760, dead: 18 },
];

const maxBar = Math.max(...diseaseStats.map(d => d.infected));

const HealthOfficialDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  // Get registered employees from sessionStorage
  const registeredEmployees = JSON.parse(sessionStorage.getItem("registeredEmployees") || "{}");

  // Persist selected company in sessionStorage
  useEffect(() => {
    const storedCompany = sessionStorage.getItem('selectedCompany');
    if (storedCompany) setSelectedCompany(storedCompany);
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      sessionStorage.setItem('selectedCompany', selectedCompany);
    } else {
      sessionStorage.removeItem('selectedCompany');
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (searchId.trim()) {
      const found = employeesData.find(e => e.id.toLowerCase() === searchId.trim().toLowerCase());
      if (found) setSelectedCompany(found.companyId);
    }
  }, [searchId]);

  const filteredEmployees = employeesData.filter(
    e =>
      (!selectedCompany || e.companyId === selectedCompany) &&
      (!searchId.trim() || e.id.toLowerCase().includes(searchId.trim().toLowerCase()))
  );

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('selectedCompany');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="health-dashboard" style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #e3f0ff 100%)', minHeight: '100vh', boxShadow: 'none', position: 'relative' }}>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          background: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.5rem 1.5rem',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(211,47,47,0.08)'
        }}
      >
        Logout
      </button>
      <header>
        <h1 style={{
          color: '#1976d2',
          fontWeight: 700,
          fontSize: '2.4rem',
          letterSpacing: '0.5px',
          marginBottom: '0.5rem'
        }}>
          <span style={{ verticalAlign: 'middle', marginRight: 8 }}>🩺</span>
          Health Official Dashboard
        </h1>
        <p style={{ color: '#388e3c', fontWeight: 500, fontSize: '1.1rem', marginBottom: 0 }}>
          Monitor migrant health & disease trends
        </p>
      </header>
      <div className="dashboard-controls" style={{ marginTop: 24 }}>
        <input
          type="text"
          placeholder="Search Employee ID"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="search-bar"
          style={{ background: '#f0f7fa', borderColor: '#90caf9' }}
        />
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          className="company-dropdown"
          style={{ background: '#f0f7fa', borderColor: '#90caf9' }}
        >
          <option value="">Select Company</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Table - moved above disease tally */}
      {selectedCompany && (
        <section className="company-employee-section" style={{
          background: '#e3f2fd',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.07)',
          padding: '24px 18px',
          margin: '32px 0 24px 0'
        }}>
          <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: '1.3rem', marginBottom: 16 }}>
            Employees of{' '}
            {companies.find(c => c.id === selectedCompany)?.name || 'Selected Company'}
          </h2>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Swasthi ID</th>
                <th>Place of Origin</th>
                <th>Hospital Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => {
                const reg = registeredEmployees[emp.id];
                const swasthiId = reg ? reg.swasthiId : emp.swasthiId;
                return (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>
                      {swasthiId ? (
                        <span style={{ color: "#1976d2", fontWeight: 600 }}>{swasthiId}</span>
                      ) : (
                        <span style={{ color: 'red', fontWeight: 600 }}>Unregistered</span>
                      )}
                    </td>
                    <td>{reg ? reg.place : emp.place}</td>
                    <td>{reg ? reg.hospital : emp.hospital}</td>
                    <td>
                      {swasthiId ? (
                        <button
                          onClick={() => navigate(`/dhcoutput/${emp.id}`)}
                          className="action-btn view-btn"
                        >
                          View DHC
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/register/${emp.id}`)}
                          className="action-btn register-btn"
                        >
                          Register
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}

      {/* Disease tally and chart */}
      <section style={{
        margin: '0 0 32px 0',
        background: '#f8fdff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.07)',
        padding: '24px 18px'
      }}>
        <h2 style={{ color: '#1976d2', fontWeight: 600, marginBottom: 16, fontSize: '1.3rem' }}>
          Disease Tally (Migrant Workers)
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 18 }}>
            <thead>
              <tr style={{ background: '#e3f2fd' }}>
                <th style={thStyle}>Disease</th>
                <th style={thStyle}>Infected</th>
                <th style={thStyle}>Bar Chart</th>
              </tr>
            </thead>
            <tbody>
              {diseaseStats.map(d => (
                <tr key={d.disease}>
                  <td style={tdStyle}><b>{d.disease}</b></td>
                  <td style={{ ...tdStyle, color: '#d32f2f', fontWeight: 600, fontSize: '1.1rem' }}>{d.infected}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Bar color="#2563eb" value={d.infected} max={maxBar} label="Infected" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: '0.98rem', color: '#1976d2', marginTop: 8 }}>
          <span style={{ marginRight: 18 }}><span style={{ color: '#2563eb', fontWeight: 700 }}>■</span> Infected</span>
        </div>
      </section>
    </div>
  );
};

// Simple bar for the chart
function Bar({ color, value, max, label }: { color: string; value: number; max: number; label: string }) {
  const width = Math.max(10, (value / max) * 80); // min width for visibility
  return (
    <div title={label + ': ' + value} style={{
      background: color,
      height: 14,
      width: width,
      borderRadius: 4,
      display: 'inline-block',
      transition: 'width 0.3s'
    }} />
  );
}

const thStyle: React.CSSProperties = {
  padding: '8px 10px',
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.05rem',
  borderBottom: '2px solid #bbdefb',
  background: '#e3f2fd',
  textAlign: 'center'
};

const tdStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderBottom: '1px solid #e0e0e0',
  textAlign: 'center',
  background: '#fff'
};

export default HealthOfficialDashboard;