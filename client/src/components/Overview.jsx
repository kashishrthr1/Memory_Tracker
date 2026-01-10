

import React, { useEffect, useState } from "react";
import RevisionModal from "./RevisionModal";

const Overview = ({ score = 42, nextTopic ,userName}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Small delay to ensure the transition is visible after component mount
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const chartStyle = {
    "--progress": animatedScore,
  };

  return (
    <section className="overview">
      <div className="overview-top">
        <div className="overview-text box">
          <div className="welcome-header">
            <h1>Welcome back, {userName || "Student"} </h1>
          </div>

          <p className="welcome-description">
            You’re making steady progress in strengthening your memory.
            Consistent revisions over time help lock concepts in and reduce
            last-minute stress.
          </p>

          <p className="welcome-description muted">
            Today is a good day to revisit one pending topic and reinforce what
            you already know. Small sessions compound into long-term retention.
          </p>
        </div>

        <div className="overview-chart box">
          <div className="pie-container">
            <div className="pie-chart" style={chartStyle}>
              <div className="pie-inner">
                <span className="pie-number">{animatedScore}%</span>
                <span className="pie-label">Memory Score</span>
              </div>
            </div>

            <div className="pie-meta">
              <span className="pie-trend positive">▲ +10% this week</span>
              <p className="pie-insight">
                Strong retention — keep revising consistently
              </p>
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
             onClick={() => setIsModalOpen(true)}
            >
              Start Revision Session
            </button>

            <p className="revise-question">Boost your score by 5% today</p>
          </div>
        </div>
      </div>
      {nextTopic && (
        <RevisionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          topicId={nextTopic.id}
          topicName={nextTopic.name}
        />
      )}
    </section>
  );
};

export default Overview;
