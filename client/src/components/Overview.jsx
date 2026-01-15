import React, { useEffect, useState } from "react";
import RevisionModal from "./RevisionModal";

const Overview = ({
  score = 0,
  trend = 0,
  nextTopic,
  userName,
  topics = [],
  revisedTodayCount = 0,
  
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  // --- Logic: Topics Due & Progress ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Identify topics due today or overdue
  const dueTopics = topics.filter((t) => {
    if (!t.optimalRevisionDate) return false;
    const dueDate = new Date(t.optimalRevisionDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate <= today;
  });

  const dueCount = dueTopics.length;

  // 2. Identify revisions completed TODAY (from activities)
  // assuming activities have a 'date' or 'timestamp' and 'type' === 'revision'

  

  // 3. Progress Calculation
  // We want the progress bar to fill up as we revise the 'due' topics.
  // Maximum value = (Due count at start of day).
  // Since we don't track "start of day" due count, we can approximate:
  // Total Target = Current Due + Revised Today.
  const totalTarget = dueCount + revisedTodayCount;
  const progressPercent =
    totalTarget === 0 ? 100 : (revisedTodayCount / totalTarget) * 100;

  // --- Logic: Pie Chart Animation ---
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  // If score is 80%, we want to show 80% of the circle
  // strokeDashoffset = circumference - (score / 100) * circumference
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  const trendClass = trend >= 0 ? "positive" : "negative";
  const trendIcon = trend >= 0 ? "▲" : "▼";

  const progressMessage =
    totalTarget === 0
      ? "You're ahead of schedule today 🎉"
      : revisedTodayCount === 0
      ? "Starting is the hardest part — just one topic helps."
      : revisedTodayCount === totalTarget
      ? "Perfect day. You completed everything 💯"
      : "Nice momentum — keep going.";

  return (
    <section className="overview">
      <div className="overview-top">
        {/* WELCOME SECTION */}
        <div className="overview-text box welcome-box">
          <div className="welcome-header">
            <h1>Hi, {userName || "Student"}! 👋</h1>
            <p className="date-display">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <p className="welcome-description">
            Your brain is <strong>{animatedScore}% charged</strong> today.
            {dueCount > 0
              ? ` You have ${dueCount} topics waiting for reviewing.`
              : " You're all caught up! Great job."}
          </p>
          <div className="quick-stats">
            <div className="stat">
              <p className="stat-value">{dueCount}</p>
              <p className="stat-label">Due Today</p>
            </div>
            <div className="stat">
              <p className="stat-value">{revisedTodayCount}</p>
              <p className="stat-label">Done</p>
            </div>
          </div>
        </div>

        {/* PIE CHART SECTION */}
        <div className="overview-chart box">
          {/* HEADER — top left */}
          <div className="box-header">
            <p className="label">Memory Score</p>
            <span className="sub-label">This week</span>
          </div>

          {/* HORIZONTAL CONTENT ROW */}
          <div className="memory-row">
            {/* MESSAGE */}
            <div className="memory-message">
              <p className="memory-primary">
                Your retention is looking
                <strong> {trend >= 0 ? " strong" : " weaker"} </strong>
                this week.
              </p>
              <p className="memory-secondary">
                Consistent revisions help maintain long-term memory.
              </p>
            </div>

            {/* PIE */}
            <div className="pie-container">
              <svg
                width="140"
                height="140"
                viewBox="0 0 120 120"
                className="pie-svg"
              >
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="pie-circle-anim"
                  transform="rotate(-90 60 60)"
                />
              </svg>

              <div className="pie-content-abs">
                <span className="pie-number">{animatedScore}</span>
                <span className="pie-label">Score</span>
              </div>
            </div>

            {/* META */}
            <div className="pie-meta-new">
              <span className={`pie-trend ${trendClass}`}>
                {trendIcon} {Math.abs(trend)}%
              </span>
              <span className="pie-label-sm">vs last week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overview-bottom">
        {/* TOPICS DUE / PROGRESS SECTION */}
        <div className="box progress-box">
          <div className="box-header">
            <p className="label">Today's Goals</p>
            <span className="sub-label">
              {revisedTodayCount}/{totalTarget} polished
            </span>
          </div>

          <div className="progress-wrapper">
            {/* NEW SUBHEADING */}
            <div className="progress-context">
              <p className="context-title">Daily Revision Progress</p>
              <p className="context-subtitle">Based on topics due today</p>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
              <div className="progress-glow" />
            </div>

            <div className="progress-meta">
              <span className="progress-value">
                {revisedTodayCount} / {totalTarget}
              </span>
              <span className="progress-percent">
                {Math.round(progressPercent)}%
              </span>
            </div>

            <p className="progress-text">{progressMessage}</p>
          </div>
        </div>

        {/* REVISION BOX (NEXT MILESTONE) */}
        <div className="box revision-box">
          <div className="box-header">
            <p className="label">Up Next</p>
          </div>

          <div className="revision-details">
            <div className="detail-item">
              <span className="detail-label">TOPIC</span>
              <span className="detail-value truncate">
                {nextTopic ? nextTopic.name : "All clear!"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">DUE</span>
              <span className="detail-value">
                {nextTopic ? nextTopic.nextRevision : "-"}
              </span>
            </div>
          </div>

          <div className="revision-action">
            <button
              className="btn-primary revise-btn"
              onClick={() => nextTopic && setIsModalOpen(true)}
              disabled={!nextTopic}
            >
              Start Session
            </button>
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
