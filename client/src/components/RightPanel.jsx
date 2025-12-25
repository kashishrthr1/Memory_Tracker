import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function RightPanel({ mode }) {
  return (
    <div className="right-panel">
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default RightPanel;
