import React from "react";
import { useNavigate } from "react-router-dom";

const BloodCompatibilityChart = () => {
  const navigate = useNavigate();

  const bloodData = [
    { type: "O−", donateTo: "All Blood Groups", receiveFrom: "O− only" },
    { type: "O+", donateTo: "O+, A+, B+, AB+", receiveFrom: "O−, O+" },
    { type: "A−", donateTo: "A−, A+, AB−, AB+", receiveFrom: "O−, A−" },
    { type: "A+", donateTo: "A+, AB+", receiveFrom: "O−, O+, A−, A+" },
    { type: "B−", donateTo: "B−, B+, AB−, AB+", receiveFrom: "O−, B−" },
    { type: "B+", donateTo: "B+, AB+", receiveFrom: "O−, O+, B−, B+" },
    { type: "AB−", donateTo: "AB−, AB+", receiveFrom: "O−, A−, B−, AB−" },
    { type: "AB+", donateTo: "AB+ only", receiveFrom: "All Blood Groups" }
  ];

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 style={styles.title}>Blood Compatibility Chart</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Blood Type</th>
            <th style={styles.th}>Can Donate To</th>
            <th style={styles.th}>Can Receive From</th>
          </tr>
        </thead>
        <tbody>
          {bloodData.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{item.type}</td>
              <td style={styles.td}>{item.donateTo}</td>
              <td style={styles.td}>{item.receiveFrom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    position: "relative",
  },
  title: {
    marginBottom: "30px",
    color: "#b30000",
  },
  table: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#b30000",
    color: "white",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  backButton: {
    position: "absolute",
    left: "20px",
    top: "20px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
};

export default BloodCompatibilityChart;