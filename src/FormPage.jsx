import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function FormPage({ user }) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Add data to 'submissions' collection in Firestore
      await addDoc(collection(db, "submissions"), {
        first,
        second,
        third,
        fourth,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });

      setMessage("Data saved successfully to Firestore!");
      setFirst("");
      setSecond("");
      setThird("");
      setFourth("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Failed to save data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Submit Form Data</h3>
      
      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="First"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Second"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Third"
          value={third}
          onChange={(e) => setThird(e.target.value)}
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Fourth"
          value={fourth}
          onChange={(e) => setFourth(e.target.value)}
          style={{ padding: "8px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Saving..." : "Save to Firestore"}
        </button>
      </form>
    </div>
  );
}