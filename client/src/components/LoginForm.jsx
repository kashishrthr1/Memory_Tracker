import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import api from "../api/axios"; // Axios interceptor version use kar rahe hain

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // API call using centralized Axios instance
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      
      // Save token and redirect
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="form-title">Login</h2>
      <p className="form-subtitle">Enter your details to access your account</p>

      <div className="login-form">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && <p className="error-text" style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{error}</p>}

        <div className="flex-center">
          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </button>

          <div className="auth-switch">
            <p>New here?</p>
            <span className="link-action" onClick={() => navigate("/register")}>
              Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;