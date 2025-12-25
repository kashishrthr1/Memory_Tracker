import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="login-form">
      <InputField label="Email" type="email" />
      <InputField label="Password" type="password" />

      <div className="links">
        <span className="link-action">Forgot Password?</span>
      </div>

      <div className="flex-center">
        <button className="login-btn">Log in</button>

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
