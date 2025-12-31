// import { useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";

// function LeftPanel() {
//   const navigate = useNavigate();

//   return (
//     <div className="left-panel">
//       <div className="top-bar">
//         <IoArrowBack className="back-arrow" onClick={() => navigate("/")} />

//         <div className="avatar">L</div>
//       </div>

//       <div className="welcome-text">
//         <h1>
//           WELCOME
//           <br />
//           RANDOM STUFF
//         </h1>
//         <h3>More Random Gibberish Which Will Never End</h3>
//         <p>
//           Even more gibberish for testing purposes, hello buddy boy how are you
//           i am fantastic
//         </p>
//       </div>

//       <div className="waves" />
//     </div>
//   );
// }

// export default LeftPanel;

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
            {mode === "login" ? "WELCOME BACK" : "JOIN THE JOURNEY"}
            <br />
            <span className="brand-highlight">LEARNCURVE</span>
          </h1>
          <h3>Mastery is just a few clicks away.</h3>
          <p>
            {mode === "login"
              ? "Log in to access your personalized memory dashboard and continue your progress."
              : "Create an account to start tracking your learning and beat the forgetting curve."}
          </p>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="panel-gradient-overlay" />
    </div>
  );
}

export default LeftPanel;
