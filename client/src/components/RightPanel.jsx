import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function RightPanel({ mode }) {
  const navigate = useNavigate();
  
  return (
    <div className="right-panel">
      <div className="mobile-back-button" onClick={() => navigate("/")}>
        <IoArrowBack className="back-arrow" />
      </div>
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default RightPanel;
