import { useState } from "react";
import ListItem from "./ListItem";
import Modal from "./Modal";

// Initial data moved inside the component state
const INITIAL_DATA = [
  {
    id: 1,
    name: "Photosynthesis",
    date: "10 Apr 2025",
    score: 82,
    revisions: 5,
    lastRevision: "08 Apr 2025",
    nextRevision: "12 Apr 2025",
  },
  {
    id: 2,
    name: "React Hooks",
    date: "12 Apr 2025",
    score: 94,
    revisions: 12,
    lastRevision: "11 Apr 2025",
    nextRevision: "14 Apr 2025",
  },
  {
    id: 3,
    name: "Quantum Mechanics",
    date: "05 Apr 2025",
    score: 45,
    revisions: 2,
    lastRevision: "06 Apr 2025",
    nextRevision: "07 Apr 2025",
  },
  {
    id: 4,
    name: "World War II",
    date: "15 Mar 2025",
    score: 72,
    revisions: 8,
    lastRevision: "10 Apr 2025",
    nextRevision: "18 Apr 2025",
  },
];

const TopicList = () => {
  const [topics, setTopics] = useState(INITIAL_DATA); // State to hold all topics
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [topicName, setTopicName] = useState("");
  const [scoreValue, setScoreValue] = useState(50);

  // Automatically sort the topics by score (lowest first)
  const sortedTopics = [...topics].sort((a, b) => a.score - b.score);

  const handleFinishAssessment = () => {
    // Create the new topic object
    const newTopic = {
      id: Date.now(), // Unique ID based on timestamp
      name: topicName,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }), // e.g. "28 Dec 2025"
      score: parseInt(scoreValue),
      revisions: 0,
      lastRevision: "N/A",
      nextRevision: "Tomorrow", // Mock revision date
    };

    // Add to the list
    setTopics((prev) => [...prev, newTopic]);

    // Close and reset modal
    resetAddModal();
  };

  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => {
      setAddStep(1);
      setCurrentQuestion(1);
      setTopicName("");
      setScoreValue(50);
    }, 300);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setAddStep(3);
    }
  };

  return (
    <section className="topic-list box">
      <h2 className="section-title">Topic List</h2>

      <div className="topic-actions">
        <button
          className="add-topic-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Topic
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search topic..." />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="topic-labels">
        <span>Name</span>
        <span>Date</span>
        <span>Memory Score</span>
      </div>

      <div className="topic-items">
        {sortedTopics.map((topic, index) => (
          <ListItem key={topic.id} index={index + 1} {...topic} />
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={resetAddModal}>
        <div className="add-flow-container">
          {/* STEP 1: PROMPT */}
          {addStep === 1 && (
            <div className="step-content prompt-view">
              <h2 className="add-topic-title">Topic Name</h2>
              <input
                type="text"
                className="add-topic-input"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Enter topic name..."
                autoFocus
              />
              <div className="add-topic-info">
                <p className="info-main">Please go through the assessment</p>
                <p className="info-sub">
                  This is not a test. Just answer honestly so we can track your
                  memory over time.
                </p>
              </div>
              <button
                className="start-assessment-btn"
                onClick={() => setAddStep(2)}
                disabled={!topicName.trim()}
              >
                Start Assessment
              </button>
            </div>
          )}

          {/* STEP 2: ASSESSMENT */}
          {addStep === 2 && (
            <div className="step-content assessment-view">
              <div className="assessment-header">
                <h2 className="modal-title">Assessment</h2>
                <p className="modal-sub">
                  Topic : <strong>{topicName}</strong>
                </p>
              </div>

              <div className="question-area">
                <p className="q-text">
                  <strong>Q{currentQuestion}</strong> If you had to explain this
                  topic to someone right now, how confident are you?
                </p>
                <div className="slider-wrapper">
                  <div className="slider-labels">
                    <span>0</span>
                    <span className="current-bubble">{scoreValue}</span>
                    <span>100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scoreValue}
                    onChange={(e) => setScoreValue(e.target.value)}
                    className="assessment-slider"
                  />
                  <div className="slider-labels">
                    <small>
                      Barely
                      <br />
                      anything
                    </small>
                    <small>
                      Almost
                      <br />
                      everything
                    </small>
                  </div>
                </div>
              </div>

              <div className="assessment-footer">
                <p>Question {currentQuestion} of 5</p>
                <button className="primary-btn" onClick={handleNextQuestion}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: COMPLETE & SAVE */}
          {addStep === 3 && (
            <div
              className="step-content complete-view"
              style={{ textAlign: "center" }}
            >
              <h2 className="modal-title">Assessment Complete</h2>
              <p className="modal-sub">
                Topic : <strong>{topicName}</strong>
              </p>

              <div className="final-score-area">
                <p className="score-announcement">
                  Your Memory Score after evaluation is{" "}
                  <span>{scoreValue}%</span>
                </p>
                <p className="info-sub">
                  This is your current confidence-based memory level.
                </p>
              </div>

              <div className="progress-circle-mock">{scoreValue}%</div>

              <button className="primary-btn" onClick={handleFinishAssessment}>
                Dashboard
              </button>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default TopicList;
