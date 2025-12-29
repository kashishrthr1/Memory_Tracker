import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import "../styles/login.css";
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const navigate = useNavigate();

  // State to store input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState(""); // success/error message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password match check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register", // backend URL
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );
      setMessage(res.data.message);
      navigate("/login"); // redirect to login after successful registration
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <InputField 
          label="Name" 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange} 
        />
        <InputField 
          label="Email" 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange} 
        />
        <InputField 
          label="Password" 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange} 
        />
        <InputField 
          label="Confirm Password" 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange} 
        />

        <div className="flex-center lmargin">
          <button className="login-btn" type="submit">Register</button>
        </div>
      </form>

      {message && <p style={{color: "red", marginTop: "10px"}}>{message}</p>}

      <div className="links m-top flex-row">
        <p>Already a user?</p>
        <span className="link-action" onClick={() => navigate("/login")}>
          Log in
        </span>
      </div>
    </div>
  );
}

export default RegisterForm;
