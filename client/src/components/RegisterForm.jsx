// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import InputField from "./InputField";

// function RegisterForm() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     if (form.password !== form.confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       await API.post("/auth/register", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//       });

//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="register-form">
//       <InputField label="Name" name="name" onChange={handleChange} />
//       <InputField label="Email" name="email" onChange={handleChange} />
//       <InputField
//         label="Password"
//         type="password"
//         name="password"
//         onChange={handleChange}
//       />
//       <InputField
//         label="Confirm Password"
//         type="password"
//         name="confirmPassword"
//         onChange={handleChange}
//       />

//       {error && <p className="error-text">{error}</p>}

//       <div className="flex-center">
//         <button className="login-btn" onClick={handleRegister}>
//           Register
//         </button>

//         <div className="links m-top flex-row">
//           <p>Already a user?</p>
//           <span className="link-action" onClick={() => navigate("/login")}>
//             Log in
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import InputField from "./InputField";

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

  const handleRegister = async () => {
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
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="form-title">Create Account</h2>
      <p className="form-subtitle">
        Join us to start mastering your memory today.
      </p>

      <div className="register-form">
        <InputField
          label="Full Name"
          name="name"
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

        {error && <p className="error-text">{error}</p>}

        <div className="flex-center">
          <button
            className="auth-btn"
            onClick={handleRegister}
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
      </div>
    </div>
  );
}

export default RegisterForm;
