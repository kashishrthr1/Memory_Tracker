import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo-circle">L</div>

      <div className="nav-pills">
        <button className="nav-btn active" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="nav-btn">Dashboard</button>
        <button className="nav-btn">Contact</button>
      </div>

      <div className="nav-actions">
        <div
          className="action-box box-outline"
          onClick={() => navigate("/login")}
        >
          Log In
        </div>

        <div
          className="action-box box-solid"
          onClick={() => navigate("/register")}
        >
          Register
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
