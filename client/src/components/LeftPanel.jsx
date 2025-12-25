import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function LeftPanel() {
  const navigate = useNavigate();

  return (
    <div className="left-panel">
      <div className="top-bar">
        <IoArrowBack className="back-arrow" onClick={() => navigate("/")} />

        <div className="avatar">L</div>
      </div>

      <div className="welcome-text">
        <h1>
          WELCOME
          <br />
          RANDOM STUFF
        </h1>
        <h3>More Random Gibberish Which Will Never End</h3>
        <p>
          Even more gibberish for testing purposes, hello buddy boy how are you
          i am fantastic
        </p>
      </div>

      <div className="waves" />
    </div>
  );
}

export default LeftPanel;
