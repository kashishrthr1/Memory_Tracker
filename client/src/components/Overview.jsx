// import React, { useEffect, useState } from "react";

// const Overview = ({ score = 72, nextTopic, onReviseClick }) => {
//   const [animatedScore, setAnimatedScore] = useState(0);

//   // Trigger animation on mount
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setAnimatedScore(score);
//     }, 100);
//     return () => clearTimeout(timeout);
//   }, [score]);

//   // Dynamic style for the conic gradient
//   const chartStyle = {
//     background: `conic-gradient(
//       #6366f1 0deg ${animatedScore * 3.6}deg,
//       #e2e8f0 ${animatedScore * 3.6}deg 360deg
//     )`,
//   };

//   return (
//     <section className="overview">
//       <div className="overview-top">
//         <div className="overview-text box">
//           <h1>Welcome back, Kashish</h1>
//           <p className="score-text">
//             Your weekly memory score is{" "}
//             <span className="highlight">{score}%</span>
//           </p>
//           <p className="score-subtext">That’s 10% higher than last week</p>
//         </div>

//         <div className="overview-chart box">
//           <div className="pie-container">
//             <div className="pie-chart" style={chartStyle}>
//               <div className="pie-inner">
//                 <span className="pie-number">{animatedScore}%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="overview-bottom">
//         <div className="box graph-box">
//           <div className="placeholder-content">
//             <p className="label">Memory Activity</p>
//             <div className="line-placeholder">Line graph visualization</div>
//           </div>
//         </div>

//         <div className="box revision-box">
//           <div className="revision-info">
//             <p>
//               <span className="label">Next Revision:</span>
//               <span className="highlight2">
//                 {nextTopic ? nextTopic.name : "None Pending"}
//               </span>
//             </p>
//             <p>
//               <span className="label">Date:</span>
//               <span className="highlight2">
//                 {nextTopic ? nextTopic.nextRevision : "--"}
//               </span>
//             </p>
//           </div>

//           <div className="revision-action">
//             <p className="revise-question">Ready to improve your score?</p>
//             <button
//               className="btn-primary revise-btn"
//               onClick={onReviseClick}
//               disabled={!nextTopic}
//             >
//               Revise Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Overview;

import React, { useEffect, useState } from "react";

const Overview = ({ score = 72, nextTopic, onReviseClick }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Small delay to ensure the transition is visible after component mount
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const chartStyle = {
    background: `conic-gradient(
      #4f46e5 0deg, 
      #818cf8 ${animatedScore * 3.6}deg, 
      #f1f5f9 ${animatedScore * 3.6}deg 360deg
    )`,
  };

  return (
    <section className="overview">
      <div className="overview-top">
        <div className="overview-text box">
          <div className="welcome-header">
            {/* <span className="wave">👋</span> */}
            <h1>Welcome back, Kashish</h1>
          </div>
          <p className="score-subtext">Your weekly memory score is currently</p>
          <div className="score-display">
            <span className="highlight">{score}%</span>
            <span className="trend-badge">↑ 10% higher</span>
          </div>
        </div>

        <div className="overview-chart box">
          <div className="pie-container">
            <div className="pie-chart" style={chartStyle}>
              <div className="pie-inner">
                <span className="pie-number">{animatedScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overview-bottom">
        <div className="box graph-box">
          <div className="box-header">
            <p className="label">Memory Activity</p>
            <span className="sub-label">Last 7 days</span>
          </div>
          <div className="line-placeholder">
            {/* Replace with a chart library like Recharts later */}
            <p>Activity visualization</p>
          </div>
        </div>

        <div className="box revision-box">
          <div className="box-header">
            <p className="label">Next Milestone</p>
          </div>

          <div className="revision-details">
            <div className="detail-item">
              <span className="detail-label">TOPIC</span>
              <span className="detail-value">
                {nextTopic ? nextTopic.name : "Relax, you're caught up!"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">DUE DATE</span>
              <span className="detail-value">
                {nextTopic ? nextTopic.nextRevision : "No tasks pending"}
              </span>
            </div>
          </div>

          <div className="revision-action">
            <button
              className="btn-primary revise-btn"
              onClick={onReviseClick}
              disabled={!nextTopic}
            >
              Start Revision Session
            </button>
            <p className="revise-question">Boost your score by 5% today</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
