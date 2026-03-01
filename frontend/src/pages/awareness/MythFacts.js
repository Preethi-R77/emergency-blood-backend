import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MythFacts = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const data = [
    { myth: "Blood donation makes you weak.", fact: "Healthy donors recover quickly as the body replaces blood within days." },
    { myth: "Only O+ blood is useful.", fact: "All blood groups are important and needed in hospitals." },
    { myth: "Blood donation is painful.", fact: "The process is safe and usually causes only mild discomfort." },
    { myth: "People with tattoos cannot donate.", fact: "They can donate after the recommended waiting period." },
    { myth: "Older people cannot donate.", fact: "Healthy adults within age limits can donate safely." },
    { myth: "Blood donation affects fertility.", fact: "There is no scientific evidence supporting this myth." },
    { myth: "Blood can be manufactured.", fact: "Blood can only come from human donors." },
    { myth: "Donation reduces immunity.", fact: "It does not weaken the immune system in healthy people." },
    { myth: "You need to rest for many days.", fact: "Most donors resume normal activities within 24 hours." },
    { myth: "People with diabetes can never donate.", fact: "Some controlled cases may donate with medical approval." },

    { myth: "Vegetarians cannot donate blood.", fact: "Diet type does not stop someone from donating if they are healthy." },
    { myth: "Blood donation causes weight loss.", fact: "It does not cause permanent weight changes." },
    { myth: "Blood donation is unsafe.", fact: "It is a highly regulated and safe medical procedure." },
    { myth: "Donating blood is time consuming.", fact: "The actual donation takes only about 10–15 minutes." },
    { myth: "Blood banks have enough supply always.", fact: "Blood shortages can happen, especially during emergencies." },

    { myth: "One person’s blood is enough for many patients.", fact: "Blood is carefully matched before transfusion." },
    { myth: "Blood donation harms heart health.", fact: "Donation does not harm a healthy heart." },
    { myth: "Only hospital patients need blood.", fact: "Accident victims and surgery patients also need it." },
    { myth: "You cannot donate if you are healthy and active.", fact: "Healthy and eligible individuals are encouraged to donate." },
    { myth: "Blood testing is optional.", fact: "Every donation is tested for safety." },

    { myth: "Blood group never changes.", fact: "In rare medical cases like bone marrow transplant, it can change." },
    { myth: "You lose too much blood when donating.", fact: "Only a small controlled amount is taken." },
    { myth: "Donating blood is risky for young adults.", fact: "Healthy adults can safely donate if eligible." },
    { myth: "Blood donation affects strength permanently.", fact: "It does not reduce long-term strength." },

    { myth: "Women cannot donate blood.", fact: "Women can donate if they meet health criteria." },
    { myth: "Blood donation lowers iron too much.", fact: "Iron levels return to normal with proper diet." },
    { myth: "Frequent donors become unhealthy.", fact: "Donation intervals are designed to protect health." },
    { myth: "All blood is the same.", fact: "Different blood groups must be matched carefully." },
    { myth: "Blood donation is complicated.", fact: "It is a simple, standardized medical process." }

    // You can continue adding more until 60 total.
  ];

  useEffect(() => {
    getRandomItem();
  }, []);

  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setItem(data[randomIndex]);
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.backButton}
        onClick={() => navigate("/awareness")}
      >
        ← Back to Awareness Hub
      </button>

      <h1 style={styles.title}>Myths vs Facts</h1>

      {item && (
        <div style={styles.card}>
          <p style={styles.myth}>❌ Myth: {item.myth}</p>
          <p style={styles.fact}>✅ Fact: {item.fact}</p>
        </div>
      )}

      <button style={styles.button} onClick={getRandomItem}>
        Show Another
      </button>
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
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    textAlign: "left",
  },
  myth: { color: "red", fontWeight: "bold", marginBottom: "10px" },
  fact: { color: "green", fontWeight: "bold" },
  button: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#b30000",
    color: "white",
    cursor: "pointer",
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

export default MythFacts;