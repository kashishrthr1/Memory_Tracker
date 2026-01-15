import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  // Floating icons with positions and animation delays
  const floatingIcons = [
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      left: "10%",
      top: "20%",
      delay: 0,
      duration: 20,
    },
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      left: "85%",
      top: "15%",
      delay: 2,
      duration: 25,
    },
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      left: "15%",
      top: "70%",
      delay: 4,
      duration: 18,
    },
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
      ),
      left: "80%",
      top: "65%",
      delay: 1,
      duration: 22,
    },
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      ),
      left: "50%",
      top: "10%",
      delay: 3,
      duration: 24,
    },
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
      left: "5%",
      top: "45%",
      delay: 5,
      duration: 21,
    },
    {
      svg: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
      left: "90%",
      top: "40%",
      delay: 2.5,
      duration: 19,
    },
  ];

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Primary gradient that follows cursor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(79, 70, 229, 0.12), transparent 70%)`,
          transition: isHovering ? "none" : "background 0.3s ease-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Secondary gradient (opposite side for depth) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 400px at ${
            100 - mousePosition.x
          }% ${
            100 - mousePosition.y
          }%, rgba(129, 140, 248, 0.08), transparent 70%)`,
          transition: isHovering ? "none" : "background 0.3s ease-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Mesh gradient overlay for texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(at ${mousePosition.x + 20}% ${
            mousePosition.y - 20
          }%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
            radial-gradient(at ${mousePosition.x - 20}% ${
            mousePosition.y + 20
          }%, rgba(168, 85, 247, 0.05) 0px, transparent 50%)
          `,
          transition: isHovering ? "none" : "background-image 0.3s ease-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: item.left,
            top: item.top,
            color: "#4f46e5",
            opacity: 0.12,
            pointerEvents: "none",
            zIndex: 0,
            animation: `float ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          {item.svg}
        </div>
      ))}

      <div className="hero-content" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-badge">✨ New: Science-Based Tracking</div>
        <h1 className="hero-title">
          Master Anything <br />
          <span className="gradient-text">Before You Forget It.</span>
        </h1>
        <h2 className="hero-subtitle">
          Stop the forgetting curve. Use our science-based revision tracking to
          turn short-term study sessions into lifelong knowledge.
        </h2>
        <p className="hero-description">
          Join 2,000+ students and professionals who are optimizing their memory
          daily through interactive assessments and smart dashboards.
        </p>
        <div className="hero-btns">
          <button 
            className="btn-primary main-cta"
            onClick={() => {
              const isLoggedIn = !!localStorage.getItem("token");
              navigate(isLoggedIn ? "/dashboard" : "/login");
            }}
          >
            Start Learning Free
          </button>
        </div>
      </div>

      <style>{`
        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(79, 70, 229, 0.1);
          border-radius: 20px;
          font-size: 14px;
          color: #4f46e5;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .hero-title {
          font-size: 64px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 10px;
          letter-spacing: -1px;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(90deg, #4f46e5, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 28px;
          color: #4f46e5;
          font-weight: 500;
          margin-bottom: 24px;
          letter-spacing: 1px;
        }

        .hero-description {
          max-width: 650px;
          margin: 0 auto 40px;
          color: #64748b;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .floating-card {
          width: 300px;
          height: 200px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin: 60px auto;
        }

        .card-line {
          height: 12px;
          background: #e2e8f0;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .card-line.short {
          width: 60%;
        }

        .card-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #4f46e5, #818cf8);
          border-radius: 50%;
          margin-top: 24px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 20px;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) translateX(5px) rotate(3deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
