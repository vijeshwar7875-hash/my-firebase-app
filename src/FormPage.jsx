import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function FormPage({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Add data to 'submissions' collection in Firestore
      await addDoc(collection(db, "submissions"), {
        title,
        description,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });

      setMessage("Data saved successfully to Firestore!");
      setTitle("");
      setDescription("");
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
          placeholder="Title / Item Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          style={{ padding: "8px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Saving..." : "Save to Firestore"}
        </button>
      </form>
    </div>
  );
}