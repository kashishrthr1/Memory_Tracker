import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import "../styles/login.css";

function RegisterForm() {
  const navigate = useNavigate();

  return (
    <div className="register-form">
      <InputField label="Name" type="text" />
      <InputField label="Email" type="email" />
      <InputField label="Password" type="password" />
      <InputField label="Confirm Password" type="password" />

      <div className="flex-center lmargin">
        <button className="login-btn">Register</button>

        <div className="links m-top flex-row">
          <p>Already a user?</p>
          <span className="link-action" onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
