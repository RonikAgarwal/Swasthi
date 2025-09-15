import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import emailjs from 'emailjs-com';
import greyFingerprint from '../assets/fingerprint-grey.png';
import greenFingerprint from '../assets/fingerprint-green.png';

function generateSwasthiId() {
  return "SW" + Math.floor(100000 + Math.random() * 900000);
}

function addDays(dateStr: string, days: number) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  color: "#2563eb",
  marginBottom: "0.2rem",
  marginLeft: "2px",
  fontSize: "1.08rem",
  letterSpacing: "0.01em",
};

const DHCinput: React.FC = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    name: "",
    medicalId: employeeId || "",
    bloodGroup: "",
    age: "",
    medications: "",
    allergies: "",
    chronic: "",
    checkup: today,
    nextAppointment: addDays(today, 180),
    disability: "",
    vaccination: "",
    illnesses: "",
    hospitalizations: "",
    emergencyContact: "",
    place: "",
    hospital: "",
    biometricsRegistered: false,
  });

  // Biometric modal and status states
  const [biometricModalOpen, setBiometricModalOpen] = useState(false);
  const [fingerStatus, setFingerStatus] = useState<"idle" | "capturing" | "success">("idle");
  const [biometricsRegistered, setBiometricsRegistered] = useState(false);

  // Update nextAppointment when checkup changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (name === "checkup") {
      updatedForm.nextAppointment = addDays(value, 180);
    }
    setForm(updatedForm);
  };

  // Handle biometric capture simulation
  const handleAddFingerprint = () => {
    setFingerStatus("capturing");
    setTimeout(() => {
      setFingerStatus("success");
    }, 3000);
  };

  // Handle closing modal after success
  const handleBiometricDone = () => {
    setBiometricModalOpen(false);
    setBiometricsRegistered(true);
    setFingerStatus("idle");
    setForm((prev) => ({ ...prev, biometricsRegistered: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send('service_j1g0x1b', 'template_lvnw94s', {
      to_email: 'ronikagarwal28@gmail.com',
    }, 'aSrHl695D3QvbQCoj');
    // Generate Swasthi ID
    const swasthiId = generateSwasthiId();
    // Save to sessionStorage
    const registered = JSON.parse(sessionStorage.getItem("registeredEmployees") || "{}");
    registered[form.medicalId] = {
      ...form,
      swasthiId,
      biometricsRegistered: biometricsRegistered || form.biometricsRegistered,
    };
    sessionStorage.setItem("registeredEmployees", JSON.stringify(registered));
    // Redirect to dashboard
    navigate("/health");
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
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#1e3a8a", marginBottom: "0.5rem" }}>Digital Health Card Registration</h1>
          <p style={{ color: "#2563eb" }}>Enter Patient Medical Information</p>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "#2563eb", fontSize: "1.1rem", marginBottom: "1rem" }}>Basic Information</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <input name="name" type="text" placeholder="Patient Name" value={form.name} onChange={handleChange} style={inputStyle} required />
            <input name="medicalId" type="text" placeholder="Medical ID" value={form.medicalId} onChange={handleChange} style={inputStyle} required />
            <input name="bloodGroup" type="text" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} style={inputStyle} />
            <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} style={inputStyle} />
          </div>
          <input name="place" type="text" placeholder="Place of Origin" value={form.place} onChange={handleChange} style={inputStyle} />
          <input name="hospital" type="text" placeholder="Hospital Name" value={form.hospital} onChange={handleChange} style={inputStyle} />

          <h2 style={{ color: "#2563eb", fontSize: "1.1rem", marginBottom: "1rem" }}>Critical Information</h2>
          <textarea name="medications" placeholder="Current Medications" value={form.medications} onChange={handleChange} style={textareaStyle} />
          <textarea name="allergies" placeholder="Allergies" value={form.allergies} onChange={handleChange} style={textareaStyle} />

          <h2 style={{ color: "#2563eb", fontSize: "1.1rem", marginBottom: "1rem" }}>Important Medical Information</h2>
          <textarea name="chronic" placeholder="Chronic Conditions (e.g. Asthma, Diabetes)" value={form.chronic} onChange={handleChange} style={textareaStyle} />
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={labelStyle}>Checkup Date</div>
              <input
                name="checkup"
                type="date"
                value={form.checkup}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <h2 style={{ color: "#2563eb", fontSize: "1.1rem", marginBottom: "1rem" }}>Additional Information</h2>
          <textarea name="disability" placeholder="Disability Status" value={form.disability} onChange={handleChange} style={textareaStyle} />
          <textarea name="vaccination" placeholder="Vaccination & Immunization" value={form.vaccination} onChange={handleChange} style={textareaStyle} />

          <h2 style={{ color: "#2563eb", fontSize: "1.1rem", marginBottom: "1rem" }}>Medical History</h2>
          <textarea name="illnesses" placeholder="Previous Illnesses/Infections" value={form.illnesses} onChange={handleChange} style={textareaStyle} />
          <textarea name="hospitalizations" placeholder="Past Hospitalizations/Surgeries" value={form.hospitalizations} onChange={handleChange} style={textareaStyle} />

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

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <input name="emergencyContact" type="text" placeholder="Emergency Contact" value={form.emergencyContact} onChange={handleChange} style={inputStyle} />
          </div>

          {/* Biometric Section - moved to bottom */}
          {/* Biometric Section - now centered above Register button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem", marginBottom: "1.2rem" }}>
            {!biometricsRegistered && !form.biometricsRegistered ? (
              <button
                type="button"
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "1.1rem 2.8rem",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  marginBottom: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
                }}
                onClick={() => setBiometricModalOpen(true)}
              >
                <img
                  src={greyFingerprint}
                  alt="Fingerprint"
                  style={{ width: 36, height: 36, background: "#000000ff", borderRadius: 6 }}
                />
                Capture Biometrics
              </button>
            ) : (
              <div
                style={{
                  color: "#388e3c",
                  fontWeight: 700,
                  fontSize: "1.18rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginBottom: "0.7rem"
                }}
              >
                <img
                  src={greenFingerprint}
                  alt="Fingerprint"
                  style={{
                    width: 32,
                    height: 32,
                  }}
                />
                Biometrics Registered
              </div>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <button type="submit" style={{
              background: "#2563eb",
              color: "#fff",
              padding: "0.75rem 2.5rem",
              border: "none",
              borderRadius: "6px",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
              disabled={!(biometricsRegistered || form.biometricsRegistered)}
            >
              Register Health Card
            </button>
          </div>
          {!(biometricsRegistered || form.biometricsRegistered) && (
            <div style={{ color: "#d32f2f", fontSize: "1.08rem", textAlign: "center", marginTop: 12 }}>
              Please register biometrics to enable registration.
            </div>
          )}
        </form>
      </div>

      {/* Biometric Modal */}
      {biometricModalOpen && (
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
              Biometric Fingerprint Capture
            </h2>
            {/* Fingerprint image simulation */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0.5rem 0 1rem 0",
                transition: "background 0.3s",
              }}
            >
              <img
                src={fingerStatus === "success" ? greenFingerprint : greyFingerprint}
                alt="Fingerprint"
                style={{
                  width: 60,
                  height: 60,
                  transition: "filter 0.3s",
                }}
              />
            </div>
            {/* Status and buttons */}
            {fingerStatus === "idle" && (
              <button
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1.6rem",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  cursor: "pointer",
                }}
                onClick={handleAddFingerprint}
              >
                Add Fingerprint
              </button>
            )}
            {fingerStatus === "capturing" && (
              <div style={{ color: "#1976d2", fontWeight: 600, fontSize: "1.1rem" }}>
                Capturing... Please place your finger
              </div>
            )}
            {fingerStatus === "success" && (
              <>
                <div style={{ color: "#388e3c", fontWeight: 700, fontSize: "1.1rem" }}>
                  Fingerprint Captured!
                </div>
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
                  onClick={handleBiometricDone}
                >
                  Done
                </button>
              </>
            )}
            {/* Close modal if not capturing */}
            {fingerStatus === "idle" && (
              <button
                style={{
                  background: "#e0e0e0",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.6rem 1.2rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setBiometricModalOpen(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "1rem",
  marginBottom: "0.5rem",
  flex: "1 1 180px"
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  padding: "0.5rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "1rem",
  marginBottom: "0.5rem",
  resize: "vertical"
};

export default DHCinput;