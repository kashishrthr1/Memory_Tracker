// const Features = () => (
//   <div className="content-section">
//     <h2 className="about-heading">About Us</h2>

//     <div className="about-grid">
//       <div className="placeholder-img"></div>

//       <div className="about-text">
//         <p>
//           This is our about section, we are so cool and crazy, its like as if we
//           are the best thing in the world, just waiting for you to use us, this
//           revision shit is kinda trash lowkey, so just use us and make that
//           process much easier cuh, This is our about section, we are so cool and
//           crazy, its like as if we are the best thing in the world, just waiting
//           for you to use us, this revision shit is kinda
//         </p>
//         <p>
//           <strong>
//             It will be worth it my doug, you will not regret the decision.
//           </strong>
//         </p>
//       </div>
//     </div>

//     <h2 className="about-heading">Features</h2>

//     <div className="features-grid">
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="feature-card">
//           <div className="feature-box"></div>
//           <p className="feature-text">
//             It will be worth it my doug, you will not regret the decision.
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );
// export default Features;

import { Zap, Target, BarChart3, MoveRight } from "lucide-react";
import { useState } from "react";
import forgettingCurve from "../assets/forgetting-curve.png";
import forgettingCurveRevision from "../assets/forgetting-curve-revision.png";

const Features = () => {
  const [activeGraph, setActiveGraph] = useState("forgetting");

  const featuresList = [
    {
      title: "Smart Tracking",
      desc: "Our algorithm predicts when you're about to forget and reminds you exactly then.",
      icon: <Zap size={32} color="#4f46e5" />,
    },
    {
      title: "Goal Oriented",
      desc: "Set your academic or professional goals and let us map the path to mastery.",
      icon: <Target size={32} color="#4f46e5" />,
    },
    {
      title: "Visual Analytics",
      desc: "Detailed heatmaps and progress charts to visualize your brain's growth.",
      icon: <BarChart3 size={32} color="#4f46e5" />,
    },
  ];

  return (
    <div className="content-section">
      {/* --- ABOUT SECTION --- */}
      <div className="about-grid">
        <div className="about-image-container">
          {/* Sublte Curved Purple Arrow */}

          <img
            src={forgettingCurve}
            className={`about-graph graph-1 ${
              activeGraph === "forgetting" ? "is-front" : "is-back"
            }`}
            onMouseEnter={() => setActiveGraph("forgetting")}
          />

          <img
            src={forgettingCurveRevision}
            className={`about-graph graph-2 ${
              activeGraph === "revision" ? "is-front" : "is-back"
            }`}
            onMouseEnter={() => setActiveGraph("revision")}
          />
        </div>
        <div className="about-text">
          {/* The key={activeGraph} ensures the animation plays every time the state changes */}
          <div key={activeGraph} className="fade-in">
            {activeGraph === "forgetting" ? (
              <>
                <h2 className="about-heading">
                  Why Traditional Studying Fails
                </h2>
                <p>
                  Human memory decays rapidly. Without timely revision, most of
                  what you study fades within days — no matter how long you
                  spent learning it.
                </p>
                <p>
                  This curve represents the natural forgetting process that
                  every student experiences.
                </p>
                <p className="about-highlight">
                  Hard work alone is not enough.
                </p>
              </>
            ) : (
              <>
                <h2 className="about-heading">How Smart Revision Fixes It</h2>
                <p>
                  Strategic revisions interrupt the forgetting curve at the
                  perfect moment, strengthening memory exactly when it’s about
                  to fade.
                </p>
                <p>
                  Our system schedules these revisions automatically using
                  <strong> spaced-repetition logic</strong>.
                </p>
                <p className="about-highlight">
                  Same effort. Permanently better results.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <h2 className="section-title-centered">Powerful Features</h2>

      <div className="features-grid">
        {featuresList.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon-box">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-text">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
