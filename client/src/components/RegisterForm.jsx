import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // Humara centralized Axios instance
import InputField from "./InputField";
import "../styles/login.css";

function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault(); // Form submit prevent karne ke liye

    // Basic password validation
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      
      // Registration ke baad seedha login par bhej dein
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="form-title">Create Account</h2>
      <p className="form-subtitle">Join us to start mastering your memory today.</p>

      <form className="register-form" onSubmit={handleRegister}>
        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@company.com"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />

        {error && <p className="error-text" style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}

        <div className="flex-center">
          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="auth-switch">
            <p>Already a user?</p>
            <span className="link-action" onClick={() => navigate("/login")}>
              Log in
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;