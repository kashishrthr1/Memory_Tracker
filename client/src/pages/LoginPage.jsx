import { useLocation } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import "../styles/login.css";

function LoginPage() {
  const location = useLocation();

  const mode = location.pathname === "/register" ? "register" : "login";

  return (
    <div className="login-page">
      <LeftPanel mode={mode} />
      <RightPanel mode={mode} />
    </div>
  );
}

export default LoginPage;
