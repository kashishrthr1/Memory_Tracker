import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { API_BASE_URL } from "../config/api";

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
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token (important)
      localStorage.setItem("token", data.token);

      // ✅ Redirect after login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... logic remains same ...
  return (
    <div className="auth-form-container">
      <h2 className="form-title">Login</h2>
      <p className="form-subtitle">Enter your details to access your account</p>

      <div className="login-form">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && <p className="error-text">{error}</p>}

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

  // return (
  //   <div className="login-form">
  //     <InputField
  //       label="Email"
  //       type="email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />

  //     <InputField
  //       label="Password"
  //       type="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />

  //     {error && <p className="error-text">{error}</p>}

  //     <div className="flex-center">
  //       <button className="login-btn" onClick={handleLogin} disabled={loading}>
  //         {loading ? "Logging in..." : "Log in"}
  //       </button>

  //       <div className="links m-top flex-row">
  //         <p>New here?</p>
  //         <span className="link-action" onClick={() => navigate("/register")}>
  //           Create a New Account
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default LoginForm;
