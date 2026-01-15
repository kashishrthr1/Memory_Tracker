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

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Add glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    
    // 2. Function to sync login state
    const syncLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("scroll", handleScroll);
    
    // 3. Listen for storage changes (works across tabs)
    window.addEventListener("storage", syncLoginState);
    
    // 4. Custom event for local changes (same tab)
    window.addEventListener("loginStateChange", syncLoginState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", syncLoginState);
      window.removeEventListener("loginStateChange", syncLoginState);
    };
  }, []);

  

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear user data too
    setIsLoggedIn(false); // Update state immediately
    setShowDropdown(false);
    
    // Notify other parts of the app
    window.dispatchEvent(new Event("loginStateChange")); 
    
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
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CircleUserRound size={32} color="#4F46E5" />
            </div>

            {/* Logout Dropdown - Inline styles to avoid CSS conflicts */}
            {showDropdown && (
              <div
                className="logout-dropdown"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  marginTop: "12px",
                  backgroundColor: "white",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  borderRadius: "25px",
                  padding: "0px",
                  zIndex: 1000,
                  minWidth: "130px",
                  border: "1px solid #eee",
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "16px",
                    border: "none",
                    background: "none",
                    color: "#ff4d4f",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderRadius: "25px",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff1f0")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
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
