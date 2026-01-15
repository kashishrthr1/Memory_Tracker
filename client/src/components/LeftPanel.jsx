import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import logo1 from "../assets/logo1.svg";

function LeftPanel({ mode }) {
  const navigate = useNavigate();
  return (
    <div className="left-panel">
      <div className="top-bar">
        <div className="back-circle" onClick={() => navigate("/")}>
          <IoArrowBack className="back-arrow" />
        </div>
        <div className="logo-circle">
          <img src={logo1} alt="DejaLearn logo" className="logo-img" />
        </div>
      </div>
      <div className="welcome-content">
        <div className="glass-card">
          <h1>
            {mode === "login" ? "WELCOME BACK" : "START YOUR JOURNEY"}
            <br />
            <span className="brand-highlight">DEJALEARN</span>
          </h1>
          <h3>
            {mode === "login"
              ? "Never forget what you've learned."
              : "Master anything, remember everything."}
          </h3>
          <p>
            {mode === "login"
              ? "Log in to continue your learning journey and track your progress with science-backed revision schedules."
              : "Join thousands of learners who are turning short-term study into long-term mastery with our smart tracking system."}
          </p>
        </div>
      </div>
      {/* Decorative background element */}
      <div className="panel-gradient-overlay" />
    </div>
  );
}

export default LeftPanel;
