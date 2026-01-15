import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

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

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container-wrapper">
      <div className="auth-form-container">
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">
          Join us to start mastering your memory today.
        </p>

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

          {error && (
            <p
              className="error-text"
              style={{ color: "red", fontSize: "0.85rem", margin: "0.5rem 0" }}
            >
              {error}
            </p>
          )}

          <div className="flex-center">
            <button className="auth-btn" type="submit" disabled={loading}>
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

      <style>{`
        .auth-form-container-wrapper {
          width: 100%;
          height: 100%;
          max-height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
        }

        .auth-form-container {
          width: 100%;
          max-width: 480px;
          box-sizing: border-box;
        }

        .form-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          font-size: clamp(0.85rem, 2vw, 1rem);
          margin-bottom: 1.5rem;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .flex-center {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .auth-btn {
          width: 100%;
          padding: 0.875rem 1.5rem;
          font-size: clamp(0.9rem, 2vw, 1rem);
        }

        .auth-switch {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
          font-size: clamp(0.85rem, 2vw, 0.95rem);
        }

        .auth-switch p {
          margin: 0;
        }

        /* Mobile optimizations */
        @media (max-height: 700px) {
          .auth-form-container-wrapper {
            align-items: flex-start;
            padding: 0.75rem;
          }

          .form-title {
            margin-bottom: 0.25rem;
          }

          .form-subtitle {
            margin-bottom: 1rem;
          }

          .register-form {
            gap: 0.75rem;
          }
        }

        @media (max-height: 600px) {
          .auth-form-container-wrapper {
            padding: 0.5rem;
          }

          .register-form {
            gap: 0.5rem;
          }

          .form-subtitle {
            margin-bottom: 0.75rem;
          }
        }

        /* Very small screens */
        @media (max-width: 360px) {
          .auth-form-container-wrapper {
            padding: 0.5rem;
          }

          .auth-btn {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default RegisterForm;
