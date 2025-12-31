import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "./InputField";
import api from "../api/axios";
function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
     
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // protected route
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-form">
      <InputField label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" type="password" onChange={(e) => setPassword(e.target.value)}  />

      <div className="links">
        <span className="link-action">Forgot Password?</span>
      </div>

      <div className="flex-center">
        <button className="login-btn" onClick={handleLogin}>Log in</button>

        <div className="links m-top flex-row">
          <p>New here?</p>
          <span className="link-action" onClick={() => navigate("/register")}>
            Create a New Account
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
