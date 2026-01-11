import axios from "axios";

// Hum 'api' variable use kar rahe hain jo interceptors ke saath configured hai
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // Agar aap cookies use kar rahe hain toh niche wali line rakhein, warna ise hata sakte hain
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Debugging ke liye console log (optional)
  // console.log("Sending token:", token); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar status 401 hai, matlab token expire ya invalid ho gaya
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out...");
      
      localStorage.removeItem("user"); // Data saaf karein
      
      // User ko login page par bhej dein
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);
export default api;