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

import { Zap, Target, BarChart3 } from "lucide-react";

const Features = () => {
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
          <div className="placeholder-img">
            {/* This represents where your main product screenshot or illustration goes */}
            <div className="inner-glow"></div>
          </div>
        </div>

        <div className="about-text">
          <h2 className="about-heading">Redefining Revision.</h2>
          <p>
            Traditional studying is broken. You spend hours reading, only to
            forget 80% of it within a week. We built this because we were tired
            of the "trash" standard of learning.
          </p>
          <p>
            Our platform uses <strong>spaced-repetition logic</strong> to ensure
            your efforts actually stick. It’s the easiest way to turn a "C" into
            an "A" without doubling your study time.
          </p>
          <p className="about-highlight">
            It will be worth it, we promise. You won't regret the decision.
          </p>
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
