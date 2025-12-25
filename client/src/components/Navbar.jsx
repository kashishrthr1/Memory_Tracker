import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo-circle">L</div>

      <div className="nav-pills">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Contact
        </NavLink>
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
