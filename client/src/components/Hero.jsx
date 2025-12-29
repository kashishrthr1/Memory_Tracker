// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="hero">
//       <h1>Welcome Everyone Random Stuff</h1>
//       <h2>More Random Gibberish Which Will Never End</h2>
//       <p>
//         Even more gibberish for testing purposes, hello buddy boy how are you i
//         am fantastic
//       </p>

//       <button className="btn-primary" onClick={() => navigate("/login")}>
//         Get Started
//       </button>
//     </section>
//   );
// };

// export default Hero;

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <div className="hero-badge">✨ New: AI-Powered Tracking</div>
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
            onClick={() => navigate("/login")}
          >
            Start Learning Free
          </button>
        </div>
      </div>

      {/* Decorative element: Floating Card Mockup */}
      <div className="hero-visual">
        <div className="floating-card">
          <div className="card-line"></div>
          <div className="card-line short"></div>
          <div className="card-circle"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
