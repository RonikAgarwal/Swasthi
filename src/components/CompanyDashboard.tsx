import React, { useState } from 'react';
import './CompanyDashboard.css';

interface CompanyDashboardProps {
  onLogout: () => void;
}

interface Employee {
  id: string;
  name: string;
  place: string;
  status: 'Registered' | 'Unregistered';
}

const initialEmployees: Employee[] = [
  { id: 'EMP001', name: 'Amit Kumar', place: 'Kochi', status: 'Registered' },
  { id: 'EMP002', name: 'Suresh Nair', place: 'Trivandrum', status: 'Unregistered' },
  { id: 'EMP003', name: 'Priya Menon', place: 'Kollam', status: 'Registered' },
  { id: 'EMP004', name: 'Rahul Das', place: 'Alappuzha', status: 'Unregistered' },
];

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ onLogout }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // For Add/Edit Modal
  const [form, setForm] = useState<{ name: string; id: string; place: string }>({
    name: '',
    id: '',
    place: '',
  });

  // Open Add Modal
  const handleAdd = () => {
    setForm({ name: '', id: '', place: '' });
    setShowAddModal(true);
  };

  // Save New Employee
  const handleAddSave = () => {
    if (!form.name.trim() || !form.id.trim() || !form.place.trim()) return;
    setEmployees([
      ...employees,
      { name: form.name.trim(), id: form.id.trim(), place: form.place.trim(), status: 'Unregistered' },
    ]);
    setShowAddModal(false);
  };

  // Open Edit Modal
  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setForm({
      name: employees[idx].name,
      id: employees[idx].id,
      place: employees[idx].place,
    });
    setShowEditModal(true);
  };

  // Save Edit
  const handleEditSave = () => {
    if (editIndex === null) return;
    const updated = [...employees];
    updated[editIndex] = {
      ...updated[editIndex],
      name: form.name.trim(),
      id: form.id.trim(),
      place: form.place.trim(),
    };
    setEmployees(updated);
    setShowEditModal(false);
    setEditIndex(null);
  };

  // Delete Employee
  const handleDelete = (idx: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="company-dashboard-bg">
      <div className="company-dashboard-container">
        {/* Header */}
        <div className="company-dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img
              src="https://img.icons8.com/ios-filled/60/1976d2/company.png"
              alt="Company"
              className="company-logo"
            />
            <div>
              <div className="company-dashboard-title">Company Dashboard</div>
              <div className="company-dashboard-subtitle">Welcome, Company Official</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Company Name and Register Button Row */}
        <div className="company-row">
          <div className="company-name-pill">Globex Ltd</div>
          <button className="register-btn" onClick={handleAdd}>
            + Register New Employee
          </button>
        </div>

        {/* Employee List */}
        <div className="employee-list-section">
          <h2 className="employee-list-title">Employee List</h2>
          <div className="employee-table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee ID</th>
                  <th>Place of Origin</th>
                  <th>Status of Swasthi ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.id}</td>
                    <td>{emp.place}</td>
                    <td>
                      <span className={emp.status === 'Registered' ? 'status-registered' : 'status-unregistered'}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-icon edit"
                        aria-label="Edit"
                        onClick={() => handleEdit(idx)}
                        title="Edit"
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M14.7 3.29a1 1 0 0 1 1.41 1.42l-9.08 9.08-2.12.71.71-2.12 9.08-9.08z" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.29 5.71l1.42 1.42" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        className="action-icon delete"
                        aria-label="Delete"
                        onClick={() => handleDelete(idx)}
                        title="Delete"
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M6 7v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M9 10v3M11 10v3M4 7h12M8 4h4a1 1 0 0 1 1 1v2H7V5a1 1 0 0 1 1-1z" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="dashboard-footer">
          <em>Privacy Note: Company officials see only Registered/Unregistered for health records, no medical details.</em>
        </footer>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register New Employee</h2>
            <input
              type="text"
              placeholder="Name"
              className="modal-input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Employee ID"
              className="modal-input"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Place of Origin"
              className="modal-input"
              value={form.place}
              onChange={e => setForm({ ...form, place: e.target.value })}
            />
            <div className="modal-actions">
              <button className="landing-btn" onClick={handleAddSave}>Add</button>
              <button className="landing-btn cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Employee Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Employee</h2>
            <input
              type="text"
              placeholder="Name"
              className="modal-input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Employee ID"
              className="modal-input"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Place of Origin"
              className="modal-input"
              value={form.place}
              onChange={e => setForm({ ...form, place: e.target.value })}
            />
            <div className="modal-actions">
              <button className="landing-btn" onClick={handleEditSave}>Save</button>
              <button className="landing-btn cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;