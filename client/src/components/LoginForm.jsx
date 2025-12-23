import InputField from "./InputField";

function LoginForm() {
  return (
    <div className="login-form">
      <InputField label="Email" type="email" />
      <InputField label="Password" type="password" />

      <div className="links">
        <a href="#">Forgot Password?</a>
      </div>

      <div className="flex-center">
        <button className="login-btn">Log in</button>
        <div className="links m-top flex-row">
          <p>New to Website Name ? </p>
          <a href="#">Create a New Account</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
