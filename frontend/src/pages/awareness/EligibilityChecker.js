import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EligibilityChecker = () => {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [result, setResult] = useState("");

  const checkEligibility = () => {
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const hbNum = Number(hemoglobin);

    if (!age || !weight || !hemoglobin) {
      setResult("⚠️ Please fill all fields.");
      return;
    }

    if (ageNum < 18 || ageNum > 60) {
      setResult("🔴 Not Eligible: Age must be between 18 and 60.");
      return;
    }

    if (weightNum < 45) {
      setResult("🔴 Not Eligible: Minimum weight should be 45kg.");
      return;
    }

    if (hbNum < 12.5) {
      setResult("🔴 Not Eligible: Hemoglobin level must be at least 12.5 g/dL.");
      return;
    }

    setResult("🟢 Eligible to Donate Blood!");
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button
        style={styles.backButton}
        onClick={() => navigate("/awareness")}
      >
        ← Back to Awareness Hub
      </button>

      <h1 style={styles.title}>Eligibility Checker</h1>

      <div style={styles.form}>
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Enter Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Enter Hemoglobin (g/dL)"
          value={hemoglobin}
          onChange={(e) => setHemoglobin(e.target.value)}
          style={styles.input}
        />

        <button onClick={checkEligibility} style={styles.button}>
          Check Eligibility
        </button>

        {result && <h3 style={styles.result}>{result}</h3>}
      </div>
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
    marginBottom: "20px",
    color: "#b30000",
  },
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#b30000",
    color: "white",
    cursor: "pointer",
  },
  result: {
    marginTop: "15px",
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

export default EligibilityChecker;