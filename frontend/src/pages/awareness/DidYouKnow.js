import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DidYouKnow = () => {
  const navigate = useNavigate();
  const [fact, setFact] = useState("");

  // 60 Advanced & Unique Blood Awareness Facts
  const facts = [
    "🩸 Blood donation is usually safe for healthy adults and is carefully monitored by medical staff.",
    "🫀 Your body contains about 4.5 to 6 liters of blood depending on your size.",
    "🧬 Blood type is determined by specific proteins called antigens on red blood cells.",
    "🔴 O negative blood is known as the universal donor for red blood cell transfusions.",
    "🟢 AB positive is known as the universal recipient for red blood cells.",
    "⏳ The human body can replace donated plasma within 24 hours.",
    "🧪 Donated blood is tested for multiple infections before being used.",
    "🏥 Blood transfusions are commonly used during surgeries and accidents.",
    "❤️ One blood donation can be separated into red cells, plasma, and platelets.",
    "🩸 Platelets help stop bleeding and are vital for cancer patients.",
    "🫁 Red blood cells carry oxygen to organs and tissues.",
    "🌡 Blood also helps regulate body temperature.",
    "🧠 Blood delivers nutrients to the brain and other organs.",
    "🧬 Blood groups are inherited from parents genetically.",
    "💉 Healthy donors can donate blood every few months as per guidelines.",
    "🩺 Before donating, your pulse and blood pressure are checked.",
    "📊 Blood donation does not weaken the immune system.",
    "🔬 The average red blood cell lives about 120 days.",
    "⚡ The body continuously produces new blood cells in the bone marrow.",
    "🩸 Plasma makes up more than half of your blood volume.",
    "🚑 Emergency trauma patients often need immediate blood transfusion.",
    "🧡 Blood donation can help patients with anemia.",
    "🧪 Blood screening reduces the risk of disease transmission.",
    "🌍 Blood cannot be manufactured in factories.",
    "👨‍⚕️ Medical professionals follow strict safety procedures during donation.",
    "📦 Blood is stored in special temperature-controlled environments.",
    "⏰ Platelets have a short shelf life of about 5 days.",
    "🔄 Blood donation encourages your body to produce new cells.",
    "💪 Healthy lifestyle supports safe blood donation.",
    "🧾 Donors must meet eligibility criteria for safety.",
    "🧍 Age and weight guidelines help protect donor health.",
    "🧃 Donors are given fluids after donation to stay hydrated.",
    "🍎 Eating iron-rich food helps maintain healthy hemoglobin levels.",
    "🩸 Blood banks depend completely on voluntary donors.",
    "❤️ Regular donors help maintain steady blood supply.",
    "🏨 Hospitals rely on blood availability for surgeries.",
    "🛡 Safety equipment is used only once and disposed properly.",
    "📅 Blood donation appointments help manage supply.",
    "🌡 Mild dizziness after donation is temporary.",
    "🧘 Resting after donation helps recovery.",
    "🥤 Drinking water before donation is recommended.",
    "📈 Demand for blood increases during disasters.",
    "🚨 Blood is essential in road accident emergencies.",
    "🧑‍🔬 Scientists continuously improve blood storage methods.",
    "🩺 Donor health is always prioritized during screening.",
    "🔁 Blood components can be used separately for different patients.",
    "💉 Blood donation centers follow hygiene standards strictly.",
    "🌟 Every eligible donor can make a life-saving difference.",
    "🧡 A single donation can help newborn babies in emergencies.",
    "🔬 Blood compatibility testing prevents harmful reactions.",
    "📊 Blood type distribution varies by population.",
    "❤️ Voluntary blood donation is considered the safest source.",
    "🌍 Many countries rely on regular donors for stability.",
    "🧬 Research in medicine depends on understanding blood components.",
    "🩹 Blood helps in healing wounds naturally.",
    "🚑 Quick blood access improves survival rates.",
    "💓 Donation does not affect long-term strength in healthy individuals.",
    "📍 Blood donation camps are organized in communities."
  ];

  // Show random fact when page loads
  useEffect(() => {
    getRandomFact();
  }, []);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex]);
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate("/awareness")}>
        ← Back
      </button>

      <h1 style={styles.title}>Did You Know?</h1>

      <div style={styles.card}>
        <h2 style={styles.factText}>{fact}</h2>
      </div>

      <button style={styles.button} onClick={getRandomFact}>
        Show Another Fact
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
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  factText: {
    fontSize: "18px",
  },
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

export default DidYouKnow;