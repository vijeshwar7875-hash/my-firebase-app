import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import FormPage from "./FormPage"; // <--- 1. IMPORT FORMPAGE HERE
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function AuthApp() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || user.email}!</h2>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleSignOut} style={{ padding: "10px 20px", marginBottom: "20px" }}>
            Log Out
          </button>

          {/* 2. FORMPAGE IS RENDERED HERE WHEN LOGGED IN */}
          <FormPage user={user} />
        </div>
      ) : (
        <div>
          <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
          
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: "8px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "8px" }}
            />
            <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
              {isSignUp ? "Register" : "Log In"}
            </button>
          </form>

          <hr style={{ margin: "20px 0" }} />

          <button onClick={handleGoogleSignIn} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Sign In with Google
          </button>

          <p style={{ marginTop: "15px" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}