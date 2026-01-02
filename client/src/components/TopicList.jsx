import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Modal from "./Modal";
import { fetchTopics, createTopic,reviseTopic } from "../api/topic";

const assessmentQuestions = [
  "If you had to explain this topic to someone right now, how confident are you?",
  "How easily could you recall the key points without looking at your notes?",
  "How well do you understand the core concepts behind this topic?",
  "How comfortable are you applying this knowledge to a practical problem?",
  "How clearly do you remember the specific details and nuances of this topic?"
];

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [answers, setAnswers] = useState({
    q1: 50,
    q2: 50,
    q3: 50,
    q4: 50,
    q5: 50,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [topicName, setTopicName] = useState("");
  const [scoreValue, setScoreValue] = useState(50);

  const token = localStorage.getItem("token");

// TopicList.jsx ke andar
const updateTopicScore = (updatedTopic) => {
  setTopics((prev) => {
    const updatedList = prev.map((t) => 
      t._id === updatedTopic._id ? updatedTopic : t
    );
    // Resorting taaki list update dikhe
    return [...updatedList].sort((a, b) => a.memoryScore - b.memoryScore);
  });
};

  /* ---------------- FETCH TOPICS ---------------- */
  const loadData = async () => {
    try {
      const res = await fetchTopics();
      // Axios stores the backend array in res.data
      setTopics(res.data); 
    } catch (err) {
      console.log("Could not load topics. Check if you are logged in.");
    }
  };

  useEffect(() => { loadData(); }, []);

  /* ---------------- ADD TOPIC ---------------- */
  const handleFinishAssessment = async () => {
    // 🔒 Close modal immediately (UI first)
    setIsAddModalOpen(false);

    
  };

  /* ---------------- UPDATE SCORE (REVISION) ---------------- */
  

  /* ---------------- HELPERS ---------------- */
  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => {
      setAddStep(1);
      setCurrentQuestion(1);
      setTopicName("");
      setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
    }, 300);
  };

  
  const handleNextQuestion = async () => {
  if (currentQuestion < 5) {
    setCurrentQuestion((p) => p + 1);
  } else {
    // 1. Loading state (Optional but good)
    setScoreValue("..."); 
    setAddStep(3); // Step 3 par le jayein

    try {
      // 2. Backend ko data bhejein
      const payload = { name: topicName, ...answers };
      const res = await createTopic(payload); // Topic create karein
      
      // 3. Backend se jo 'memoryScore' aaya hai use state mein dalein
      const finalScore = res.data.topic.memoryScore; 
      setScoreValue(finalScore); 
      window.dispatchEvent(new Event("refreshCalendar"));
      // List refresh karein
      loadData(); 
    } catch (err) {
      console.error("Error creating topic:", err);
      setScoreValue("Error");
    }
  }
};
  /* ---------------- FILTER & SORT ---------------- */
  const filteredAndSortedTopics = topics
    .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.memoryScore - b.memoryScore);

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
        <span>Next Revision Date</span>
        <span>Memory Score</span>
      </div>

      <div className="topic-items">
        {filteredAndSortedTopics.length === 0 && (
          <p className="empty-state">No topics found</p>
        )}

        {filteredAndSortedTopics.map((topic, index) => (
          <ListItem
            key={topic._id}
            id={topic._id}
            index={index + 1}
            name={topic.name}
            score={topic.memoryScore}
            revisions={topic.revisionCount}
            date={new Date(topic.createdAt).toLocaleDateString()}
            lastRevision={new Date(topic.lastRevisedAt).toLocaleDateString()}
            nextRevision={new Date(topic.nextRevisionDate).toLocaleDateString()}
            onUpdateScore={updateTopicScore}
          />
        ))}
      </div>

      {/* ---------------- MODAL ---------------- */}
      <Modal isOpen={isAddModalOpen} onClose={resetAddModal}>
        <div className="add-flow-container">
          {" "}
          {/* STEP 1: PROMPT */}{" "}
          {addStep === 1 && (
            <div className="step-content prompt-view">
              {" "}
              <h2 className="add-topic-title">Topic Name</h2>{" "}
              <input
                type="text"
                className="add-topic-input"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Enter topic name..."
                autoFocus
              />{" "}
              <div className="add-topic-info">
                {" "}
                <p className="info-main">
                  Please go through the assessment
                </p>{" "}
                <p className="info-sub">
                  {" "}
                  This is not a test. Just answer honestly so we can track your
                  memory over time.{" "}
                </p>{" "}
              </div>{" "}
              <button
                className="start-assessment-btn"
                onClick={() => setAddStep(2)}
                disabled={!topicName.trim()}
              >
                {" "}
                Start Assessment{" "}
              </button>{" "}
            </div>
          )}{" "}
          {/* STEP 2: ASSESSMENT */}{" "}
          {addStep === 2 && (
            <div className="step-content assessment-view">
              {" "}
              <div className="assessment-header">
                {" "}
                <h2 className="modal-title">Assessment</h2>{" "}
                <p className="modal-sub">
                  {" "}
                  Topic : <strong>{topicName}</strong>{" "}
                </p>{" "}
              </div>{" "}
              <div className="question-area">
                {" "}
                <p className="q-text">
                 <strong>Q{currentQuestion}</strong> {assessmentQuestions[currentQuestion - 1]}
                </p>{" "}
                <div className="slider-wrapper">
                  {" "}
                  <div className="slider-labels">
                    {" "}
                    <span>0</span>{" "}
                    <span className="current-bubble">
                      {answers[`q${currentQuestion}`]}
                    </span>{" "}
                    <span>100</span>{" "}
                  </div>{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={answers[`q${currentQuestion}`]}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [`q${currentQuestion}`]: Number(e.target.value),
                      }))
                    }
                    className="assessment-slider"
                  />{" "}
                  <div className="slider-labels">
                    {" "}
                    <small>
                      {" "}
                      Barely <br /> anything{" "}
                    </small>{" "}
                    <small>
                      {" "}
                      Almost <br /> everything{" "}
                    </small>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="assessment-footer">
                {" "}
                <p>Question {currentQuestion} of 5</p>{" "}
                <button className="primary-btn" onClick={handleNextQuestion}>
                  {" "}
                  Next{" "}
                </button>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {/* STEP 3: COMPLETE & SAVE */}{" "}
          {addStep === 3 && (
            <div
              className="step-content complete-view"
              style={{ textAlign: "center" }}
            >
              {" "}
              <h2 className="modal-title">Assessment Complete</h2>{" "}
              <p className="modal-sub">
                {" "}
                Topic : <strong>{topicName}</strong>{" "}
              </p>{" "}
              <div className="final-score-area">
                {" "}
                <p className="score-announcement">
                  {" "}
                  Your Memory Score after evaluation is{" "}
                  <span>{scoreValue}%</span>{" "}
                </p>{" "}
                <p className="info-sub">
                  {" "}
                  This is your current confidence-based memory level.{" "}
                </p>{" "}
              </div>{" "}
              <div className="progress-circle-mock">{scoreValue}%</div>{" "}
              <button className="primary-btn" onClick={handleFinishAssessment}>
                {" "}
                Dashboard{" "}
              </button>{" "}
            </div>
          )}{" "}
        </div>
      </Modal>
    </section>
  );
};

export default TopicList;