// src/hooks/useAutoLogout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = (timeoutInMinutes = 30) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      const lastActivity = localStorage.getItem("lastActivity");

      if (storedUser && lastActivity) {
        const now = Date.now();
        const diff = now - parseInt(lastActivity);
        const timeoutMs = timeoutInMinutes * 60 * 1000;

        // Agar website band thi aur user timeout limit ke baad wapas aaya
        if (diff > timeoutMs) {
          logoutUser();
        }
      }
    };

    const logoutUser = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("lastActivity");
      navigate("/login");
    };

    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    // Events to track activity
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);
    
    // Website wapas kholne par check karein
    window.addEventListener("focus", checkSession);

    // Initial checks
    checkSession();
    updateActivity();

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      window.removeEventListener("focus", checkSession);
    };
  }, [navigate, timeoutInMinutes]);
};

export default useAutoLogout;