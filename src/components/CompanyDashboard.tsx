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

// Dummy attendance initial state
type Attendance = {
  totalDays: number;
  leaves: number;
  continuousLeaves: number;
  status: "Present" | "On Leave";
};
const initialAttendance: Record<string, Attendance> = {
  EMP001: { totalDays: 22, leaves: 2, continuousLeaves: 1, status: "Present" },
  EMP002: { totalDays: 20, leaves: 6, continuousLeaves: 6, status: "On Leave" },
  EMP003: { totalDays: 18, leaves: 4, continuousLeaves: 2, status: "Present" },
  EMP004: { totalDays: 21, leaves: 5, continuousLeaves: 5, status: "On Leave" },
};

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

  // Attendance modal state
  const [attendance, setAttendance] = useState<Record<string, Attendance>>(initialAttendance);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceEmpId, setAttendanceEmpId] = useState<string | null>(null);

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
    setAttendance(prev => ({
      ...prev,
      [form.id.trim()]: { totalDays: 0, leaves: 0, continuousLeaves: 0, status: "Present" }
    }));
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
      const empId = employees[idx].id;
      setEmployees(employees.filter((_, i) => i !== idx));
      setAttendance(prev => {
        const copy = { ...prev };
        delete copy[empId];
        return copy;
      });
    }
  };

  // Attendance modal logic
  const openAttendanceModal = (empId: string) => {
    setAttendanceEmpId(empId);
    setAttendanceModalOpen(true);
  };

  const closeAttendanceModal = () => {
    setAttendanceModalOpen(false);
    setAttendanceEmpId(null);
  };

  const handleAttendanceChange = (field: keyof Attendance, value: string | number) => {
    if (!attendanceEmpId) return;
    setAttendance(prev => ({
      ...prev,
      [attendanceEmpId]: {
        ...prev[attendanceEmpId],
        [field]: field === "totalDays" || field === "leaves" || field === "continuousLeaves" ? Number(value) : value,
      },
    }));
  };

  // Attendance status color
  const getStatusColor = (att: Attendance) => {
    if (att.status === "Present") return "#388e3c";
    if (att.continuousLeaves > 5) return "#d32f2f";
    return "#fbc02d";
  };

  // Attendance warning
  const getAttendanceWarning = (att: Attendance) => {
    if (att.continuousLeaves > 5) {
      return (
        <div style={{ color: "#d32f2f", fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>
  ⚠️ Continuous leave exceeded 5 days. Company must check up on the worker.
  <div>📩 Mail sent to the employee to report at the company officials' desk</div>
</div>
      );
    }
    return null;
  };

  // Attendance modal content
  const modalEmp = attendanceEmpId ? employees.find(e => e.id === attendanceEmpId) : null;
  const modalAttendance = attendanceEmpId ? attendance[attendanceEmpId] : null;

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
                  <th>Attendance</th>
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
                    <td>
                      <button
                        style={{
                          background: "#1976d2",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.6rem 1.6rem",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          cursor: "pointer",
                        }}
                        onClick={() => openAttendanceModal(emp.id)}
                      >
                        Daily Check-In
                      </button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No employees found.</td>
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

      {/* Attendance Modal */}
      {attendanceModalOpen && modalEmp && modalAttendance && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.18)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "2.5rem 2.5rem 2rem 2.5rem",
              boxShadow: "0 6px 32px rgba(25, 118, 210, 0.13)",
              minWidth: 320,
              maxWidth: "90vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            <h2 style={{ color: "#1976d2", fontWeight: 700, marginBottom: 0 }}>
              Attendance Check-In
            </h2>
            <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>
              {modalEmp.name} <span style={{ color: "#1976d2" }}>({modalEmp.id})</span>
            </div>
            <div style={{ width: "100%", marginBottom: 10, display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Total Leaves Taken</label>
                <input
                  type="number"
                  min={0}
                  value={modalAttendance.leaves}
                  onChange={e => handleAttendanceChange("leaves", e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Continuous Leave Taken</label>
                <input
                  type="number"
                  min={0}
                  value={modalAttendance.continuousLeaves}
                  onChange={e => handleAttendanceChange("continuousLeaves", e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ width: "100%", marginBottom: 10 }}>
              <label style={labelStyle}>Total Attendance Days</label>
              <input
                type="number"
                min={0}
                value={modalAttendance.totalDays}
                onChange={e => handleAttendanceChange("totalDays", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ width: "100%", marginBottom: 10 }}>
              <label style={labelStyle}>Current Leave Status</label>
              <select
                value={modalAttendance.status}
                onChange={e => handleAttendanceChange("status", e.target.value)}
                style={{
                  ...inputStyle,
                  color: getStatusColor(modalAttendance),
                  fontWeight: 700,
                  background: "#f8fafc"
                }}
              >
                <option value="Present">Present</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            {/* Status color and warning */}
            <div style={{ margin: "0.5rem 0", fontWeight: 700, fontSize: "1.08rem", color: getStatusColor(modalAttendance) }}>
              {modalAttendance.status === "Present" && "Present"}
              {modalAttendance.status === "On Leave" && modalAttendance.continuousLeaves <= 5 && "On Leave"}
              {modalAttendance.status === "On Leave" && modalAttendance.continuousLeaves > 5 && "On Leave"}
            </div>
            {getAttendanceWarning(modalAttendance)}
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <button
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1.6rem",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  cursor: "pointer",
                }}
                onClick={closeAttendanceModal}
              >
                Save
              </button>
              <button
                style={{
                  background: "#e0e0e0",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1.6rem",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  cursor: "pointer",
                }}
                onClick={closeAttendanceModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  color: "#2563eb",
  marginBottom: "0.2rem",
  marginLeft: "2px",
  fontSize: "1.08rem",
  letterSpacing: "0.01em",
  display: "block"
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "1.08rem",
  marginBottom: "0.2rem",
  width: "100%",
  background: "#f8fafc",
  fontWeight: 500,
};

export default CompanyDashboard;