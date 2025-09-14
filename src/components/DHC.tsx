import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyData = {
  name: "Ravi Kumar",
  medicalId: "SW123456",
  bloodGroup: "B+",
  age: "32",
  medications: "Paracetamol, Metformin",
  allergies: "Penicillin",
  chronic: "Diabetes, Hypertension",
  checkup: "2024-05-15",
  nextAppointment: "2024-11-11",
  disability: "None",
  vaccination: "COVID-19 (2 doses), Tetanus",
  illnesses: "Dengue (2022)",
  hospitalizations: "Appendectomy (2020)",
  emergencyContact: "9876543210",
  place: "Delhi",
  hospital: "Apollo",
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "1.2rem",
  marginBottom: "0.5rem",
  flex: "1 1 180px",
  background: "#f8fafc",
  fontWeight: 500,
};

const inputHighlightStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#e0f7fa",
  color: "#1976d2",
  fontWeight: 700,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  color: "#2563eb",
  marginBottom: "0.2rem",
  marginLeft: "2px",
  fontSize: "1.08rem",
  letterSpacing: "0.01em",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  padding: "0.5rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "1.1rem",
  marginBottom: "0.5rem",
  resize: "vertical",
  background: "#f8fafc",
  fontWeight: 500,
};

const DHC: React.FC = () => {
  const { swasthiId: swasthiIdParam } = useParams();
  const navigate = useNavigate();

  // Find employee by swasthiId from sessionStorage
  const registeredEmployees = JSON.parse(sessionStorage.getItem("registeredEmployees") || "{}");
  const regEntry = Object.values(registeredEmployees).find(
    (emp: any) => emp.swasthiId === swasthiIdParam
  ) as any;

  const swasthiId = regEntry?.swasthiId || swasthiIdParam || "Unregistered";
  const [data] = useState(regEntry ? { ...dummyData, ...regEntry } : dummyData);

  // Helper for date formatting (DD-MM-YYYY)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #e3f0ff, #c8e6ff)",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem"
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "1rem",
            background: "#e5e7eb",
            color: "#1e3a8a",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1.5rem",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          &larr; Back
        </button>
        {/* Employee Info Card */}
        <div style={{
          background: "#e3f2fd",
          borderRadius: "10px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)"
        }}>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ color: "#1976d2", fontWeight: 700 }}>Employee ID:</span>{" "}
              <span style={{ fontWeight: 600 }}>{data.medicalId}</span>
            </div>
            <div>
              <span style={{ color: "#1976d2", fontWeight: 700 }}>Swasthi ID:</span>{" "}
              <span style={{ fontWeight: 600 }}>{swasthiId}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ color: "#1976d2", fontWeight: 700 }}>Place of Origin:</span>{" "}
              <span style={{ fontWeight: 600 }}>{data.place || "-"}</span>
            </div>
            <div>
              <span style={{ color: "#1976d2", fontWeight: 700 }}>Hospital Name:</span>{" "}
              <span style={{ fontWeight: 600 }}>{data.hospital || "-"}</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#1e3a8a", marginBottom: "0.5rem" }}>Digital Health Card</h1>
          <p style={{ color: "#2563eb" }}>Patient Medical Information</p>
        </div>
        <form>
          {/* Basic Info */}
          <h2 style={{ color: "#2563eb", fontSize: "1.2rem", marginBottom: "1rem" }}>Basic Information</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Name</div>
              <input
                name="name"
                type="text"
                value={data.name}
                style={inputStyle}
                readOnly
              />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Employee ID</div>
              <input
                name="medicalId"
                type="text"
                value={data.medicalId}
                style={inputStyle}
                readOnly
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Blood Group</div>
              <input
                name="bloodGroup"
                type="text"
                value={data.bloodGroup}
                style={inputStyle}
                readOnly
              />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Age</div>
              <input
                name="age"
                type="number"
                value={data.age}
                style={inputStyle}
                readOnly
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Last Health Checkup Date</div>
              <input
                name="checkup"
                type="text"
                value={formatDate(data.checkup)}
                style={inputStyle}
                readOnly
              />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Next Scheduled Appointment Date</div>
              <input
                name="nextAppointment"
                type="text"
                value={formatDate(data.nextAppointment)}
                style={inputHighlightStyle}
                readOnly
              />
            </div>
          </div>
          {/* Critical Info */}
          <h2 style={{ color: "#2563eb", fontSize: "1.2rem", margin: "1.5rem 0 1rem 0" }}>Critical Information</h2>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Current Medications</div>
            <textarea
              name="medications"
              value={data.medications}
              style={textareaStyle}
              readOnly
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Allergies</div>
            <textarea
              name="allergies"
              value={data.allergies}
              style={textareaStyle}
              readOnly
            />
          </div>
          {/* Important Medical Info */}
          <h2 style={{ color: "#2563eb", fontSize: "1.2rem", margin: "1.5rem 0 1rem 0" }}>Important Medical Information</h2>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Chronic Conditions</div>
            <textarea
              name="chronic"
              value={data.chronic}
              style={textareaStyle}
              readOnly
            />
          </div>
          {/* Additional Info */}
          <h2 style={{ color: "#2563eb", fontSize: "1.2rem", margin: "1.5rem 0 1rem 0" }}>Additional Information</h2>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Disability Status</div>
            <textarea
              name="disability"
              value={data.disability}
              style={textareaStyle}
              readOnly
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Vaccination & Immunization</div>
            <textarea
              name="vaccination"
              value={data.vaccination}
              style={textareaStyle}
              readOnly
            />
          </div>
          {/* Historical Info */}
          <h2 style={{ color: "#2563eb", fontSize: "1.2rem", margin: "1.5rem 0 1rem 0" }}>Medical History</h2>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Previous Illnesses/Infections</div>
            <textarea
              name="illnesses"
              value={data.illnesses}
              style={textareaStyle}
              readOnly
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <div style={labelStyle}>Past Hospitalizations/Surgeries</div>
            <textarea
              name="hospitalizations"
              value={data.hospitalizations}
              style={textareaStyle}
              readOnly
            />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Emergency Contact</div>
              <input
                name="emergencyContact"
                type="text"
                value={data.emergencyContact}
                style={inputStyle}
                readOnly
              />
            </div>
          </div>
          <div style={{
            background: "#e0f2fe",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            color: "#0369a1",
            fontSize: "0.95rem"
          }}>
            <strong>Note:</strong> All information is confidential and for medical use only.
          </div>
        </form>
      </div>
    </div>
  );
};

export default DHC;