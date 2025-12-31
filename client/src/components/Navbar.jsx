// import { NavLink, useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const hideAuthButtons = location.pathname === "/dashboard";

//   return (
//     <nav className="navbar">
//       <div className="logo-circle">L</div>

//       <div className="nav-pills">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "nav-btn active" : "nav-btn"
//           }
//         >
//           Home
//         </NavLink>

//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             isActive ? "nav-btn active" : "nav-btn"
//           }
//         >
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             isActive ? "nav-btn active" : "nav-btn"
//           }
//         >
//           Contact
//         </NavLink>
//       </div>

//       {!hideAuthButtons && (
//         <div className="nav-actions">
//           <div
//             className="action-box box-outline"
//             onClick={() => navigate("/login")}
//           >
//             Log In
//           </div>

//           <div
//             className="action-box box-solid"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logoIcon from "../assets/logo1.svg";
import fullLogo from "../assets/fullLogo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideAuthButtons = location.pathname === "/dashboard";

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-switch">
        <img src={logoIcon} alt="Logo icon" className="logo-icon" />
        <img src={fullLogo} alt="Full logo" className="logo-full" />
      </div>

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

      {!hideAuthButtons && (
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
            Get Started
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
