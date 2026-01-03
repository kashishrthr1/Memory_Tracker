import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logoIcon from "../assets/logo1.svg";
import fullLogo from "../assets/fullLogo.svg";
import { CircleUserRound, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Add glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowDropdown(false); // Close dropdown on logout
    navigate("/login");
  };

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
        <div
          className={`nav-btn ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
          onClick={handleDashboardClick}
        >
          Dashboard
        </div>

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
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          /* Profile Wrapper - Keeping original UI but adding dropdown logic */
          <div className="profile-wrapper" style={{ position: "relative" }}>
            <div 
              className="profile-icon" 
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <CircleUserRound size={32} color="#666" />
            </div>

            {/* Logout Dropdown - Inline styles to avoid CSS conflicts */}
            {showDropdown && (
              <div 
                className="logout-dropdown" 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  zIndex: 1000,
                  minWidth: '130px',
                  border: '1px solid #eee'
                }}
              >
                <button 
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    background: 'none',
                    color: '#ff4d4f',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    borderRadius: '5px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff1f0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;