import React from "react";
import { useNavigate } from "react-router-dom";

const BloodAwarenessHub = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Myths vs Facts",
      path: "/awareness/myth-facts",
      icon: "🧠",
    },
    {
      title: "Eligibility Checker",
      path: "/awareness/eligibility",
      icon: "✅",
    },
    {
      title: "Did You Know?",
      path: "/awareness/did-you-know",
      icon: "💡",
    },
    {
      title: "Compatibility Chart",
      path: "/awareness/compatibility-chart",
      icon: "🩸",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button
        style={styles.backButton}
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h1 style={styles.title}>Blood Awareness Hub</h1>

      <div style={styles.grid}>
        {modules.map((module, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(module.path)}
          >
            <div style={styles.icon}>{module.icon}</div>
            <h3>{module.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    position: "relative", // IMPORTANT
  },
  title: {
    marginBottom: "30px",
    color: "#b30000",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s",
  },
  icon: {
    fontSize: "30px",
    marginBottom: "10px",
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

export default BloodAwarenessHub;