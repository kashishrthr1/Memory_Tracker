import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import "../styles/login.css";

function LoginPage() {
  return (
    <div className="login-page">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default LoginPage;
