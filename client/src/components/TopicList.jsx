import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Modal from "./Modal";
import { fetchTopics, createTopic } from "../api/topic";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [topicName, setTopicName] = useState("");
  
  // State for assessment answers q1 through q5
  const [answers, setAnswers] = useState({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const res = await fetchTopics();
      setTopics(res.data);
    } catch (err) {
      console.error("Error loading topics:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedTopics = topics
    .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.memoryScore - b.memoryScore);

  const handleFinishAssessment = async () => {
    try {
      // payload matches backend: { name, q1, q2, q3, q4, q5 }
      await createTopic({ name: topicName, ...answers });
      loadTopics(); // Refresh list from DB
      resetAddModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create topic");
    }
  };

  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setAddStep(1);
    setCurrentQuestion(1);
    setTopicName("");
    setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 5) setCurrentQuestion((p) => p + 1);
    else setAddStep(3);
  };

  if (loading) return <div className="loading">Loading your topics...</div>;

  return (
    <section className="topic-list box">
      <h2 className="section-title">Topic List</h2>

      <div className="topic-actions">
        <button className="add-topic-btn" onClick={() => setIsAddModalOpen(true)}>
          + Add Topic
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="topic-labels">
        <span>Name</span>
        <span>Created</span>
        <span>Memory Score</span>
      </div>

      <div className="topic-items">
        {filteredAndSortedTopics.length === 0 ? (
          <p className="empty-state">No topics found. Start your learning journey by adding a topic!</p>
        ) : (
          filteredAndSortedTopics.map((topic, index) => (
            <ListItem
              key={topic._id}
              index={index + 1}
              {...topic}
              onRefresh={loadTopics}
            />
          ))
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={resetAddModal}>
        <div className="add-flow-container">
          {addStep === 1 && (
            <div className="step-content prompt-view">
              <h2 className="add-topic-title">Topic Name</h2>
              <input
                type="text"
                className="add-topic-input"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="e.g. Quantum Physics"
                autoFocus
              />
              <button 
                className="start-assessment-btn" 
                onClick={() => setAddStep(2)}
                disabled={!topicName.trim()}
              >
                Start Assessment
              </button>
            </div>
          )}

          {addStep === 2 && (
            <div className="step-content assessment-view">
              <h2 className="modal-title">Assessment: {topicName}</h2>
              <div className="question-area">
                <p className="q-text"><strong>Q{currentQuestion}</strong> How confident are you on a scale of 0-100?</p>
                <div className="slider-wrapper">
                  <span className="current-bubble">{answers[`q${currentQuestion}`]}%</span>
                  <input
                    type="range"
                    min="0" max="100"
                    value={answers[`q${currentQuestion}`]}
                    onChange={(e) => setAnswers({...answers, [`q${currentQuestion}`]: parseInt(e.target.value)})}
                    className="assessment-slider"
                  />
                </div>
              </div>
              <div className="assessment-footer">
                <p>Question {currentQuestion} of 5</p>
                <button className="primary-btn" onClick={handleNextQuestion}>Next</button>
              </div>
            </div>
          )}

          {addStep === 3 && (
            <div className="step-content complete-view" style={{ textAlign: "center" }}>
              <h2>Assessment Complete</h2>
              <p>Ready to track <strong>{topicName}</strong>?</p>
              <button className="primary-btn" onClick={handleFinishAssessment}>Add to Dashboard</button>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default TopicList;