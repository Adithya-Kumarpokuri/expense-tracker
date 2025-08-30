import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";

function SetLimitPage() {
  const { SetLimit, limit } = useGlobalContext();
  const [inputLimit, setInputLimit] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputLimit || Number(inputLimit) <= 0) {
      setError("Please enter a valid positive number");
      return;
    }
    setError("");
    await SetLimit(Number(inputLimit));
    setInputLimit("");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "2rem",
      minHeight: "100%",
      boxSizing: "border-box"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.9)",
        borderRadius: "16px",
        padding: "2rem 2.5rem",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 20px 40px rgba(0,0,0,0.07)",
        position: "relative"
      }}>
        <h2 style={{
          margin: "0 0 1rem",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#2c2e72"
        }}>
          Set Expense Limit
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 150px", minWidth: "140px" }}>
            <label htmlFor="limitInput" style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px" }}>
              Enter limit
            </label>
            <input
              id="limitInput"
              type="number"
              value={inputLimit}
              onChange={(e) => setInputLimit(e.target.value)}
              placeholder="e.g., 50"
              style={{
                width: "100%",
                padding: "0.65rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.25rem",
                background: "#5c4fff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 10px 25px rgba(92,79,255,0.35)"
              }}
            >
              Set Limit
            </button>
          </div>
        </form>
        {error && (
          <div style={{ color: "#d9534f", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}
        <p style={{
          marginTop: "1.25rem",
          fontSize: "1rem",
          color: "#555"
        }}>
          Current Limit: <strong>{limit?.amount ?? "0"}%</strong>
        </p>
      </div>
    </div>
  );
}

export default SetLimitPage;

