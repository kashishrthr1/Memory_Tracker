import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Modal from "./Modal";
import { fetchTopics, createTopic } from "../api/topic";

const assessmentQuestions = [
  "If you had to explain this topic to someone right now, how confident are you?",
  "How easily could you recall the key points without looking at your notes?",
  "How well do you understand the core concepts behind this topic?",
  "How comfortable are you applying this knowledge to a practical problem?",
  "How clearly do you remember the specific details and nuances of this topic?",
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

  /* ---------------- FETCH TOPICS ---------------- */
  const loadData = async () => {
    try {
      const res = await fetchTopics();
      const fetchedTopics = res.data;

      // Loop through each topic to log the details
      fetchedTopics.forEach(topic => {
        console.log('📅 Topic:', topic.topicName);
        console.log('   - optimalRevisionDate (raw):', topic.optimalRevisionDate);
        console.log('   - Parsed Date:', new Date(topic.optimalRevisionDate));
        console.log('   - Displayed as:', new Date(topic.optimalRevisionDate).toLocaleDateString('en-GB'));
        console.log('   - stability:', topic.stability);
        console.log('---');
      });

      setTopics(fetchedTopics);
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      console.log("Could not load topics.");
    }
  };

  useEffect(() => {
    loadData();
    const handleRefresh = () => {
      console.log("Refreshing data from event...");
      loadData();
    };

    window.addEventListener("refreshCalendar", handleRefresh);
    window.addEventListener("refreshDashboardData", handleRefresh);

    return () => {
      window.removeEventListener("refreshCalendar", handleRefresh);
      window.removeEventListener("refreshDashboardData", handleRefresh);
    };
  }, []);

  /* ---------------- UPDATE SCORE (FROM REVISION) ---------------- */
  const updateTopicScore = (updatedTopic) => {
    setTopics((prev) => {
      const updated = prev.map((t) =>
        t._id === updatedTopic._id ? updatedTopic : t
      );
      return [...updated].sort((a, b) => a.currentScore - b.currentScore);
    });
  };

  /* ---------------- HELPERS ---------------- */
  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => {
      setAddStep(1);
      setCurrentQuestion(1);
      setTopicName("");
      setScoreValue(50);
      setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
    }, 300);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((p) => p + 1);
      return;
    }

    // Final submission
    setAddStep(3);
    setScoreValue("...");

    try {
      const responseArray = [answers.q1, answers.q2, answers.q3, answers.q4, answers.q5];

      const payload = {
        topicName: topicName, // Backend 'topicName' key use kar raha hai
        assessmentResponses: responseArray
      };

      const res = await createTopic(payload);
      setScoreValue(Math.round(res.data.baseMemoryScore));
      setScoreValue(Math.round(res.data.baseMemoryScore));
      window.dispatchEvent(new Event("refreshCalendar"));
      window.dispatchEvent(new Event("refreshDashboardData"));
      // loadData(); // Removed, as event listener handles reload
    } catch (err) {
      console.error(err);
      setScoreValue("Error");
    }
  };

  /* ---------------- FILTER & SORT ---------------- */
  // TopicList.jsx mein filtered topics ka logic aise update karein:
  const filteredAndSortedTopics = topics
    .filter((t) => {
      // Check if topicName exists before calling toLowerCase
      const nameToSearch = t.topicName || t.name || "";
      return nameToSearch.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => (a.currentScore || 0) - (b.currentScore || 0));

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
        <span>#</span> {/* Serial Placeholder */}
        <span></span>  {/* Strip Placeholder */}
        <span>Name</span>
        <span>Next Revision</span>
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
            name={topic.topicName}
            score={topic.currentScore}
            // Safe Date Parsing
            nextRevision={
              topic.optimalRevisionDate
                ? new Date(topic.optimalRevisionDate).toLocaleDateString('en-GB')
                : "Pending"
            }
            onUpdateScore={updateTopicScore}
            // Baaki props jo Details Modal mein kaam aayenge
            date={new Date(topic.createdAt).toLocaleDateString()}
            revisions={topic.revisionCount}
            lastRevision={
              topic.lastRevisedAt
                ? new Date(topic.lastRevisedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
                : "Not revised yet"
            }
          />
        ))}
      </div>

      {/* ---------------- MODAL ---------------- */}
      <Modal isOpen={isAddModalOpen} onClose={resetAddModal}>
        <div className="add-flow-container">
          {/* STEP 1 */}
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
                  This is not a test. Answer honestly to track memory over time.
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

          {/* STEP 2 */}
          {addStep === 2 && (
            <div className="step-content assessment-view">
              <div className="assessment-header">
                <h2 className="modal-title">Assessment</h2>
                <p className="modal-sub">
                  Topic : <strong>{topicName}</strong>
                </p>
              </div>

              <p className="q-text">
                <strong>Q{currentQuestion}</strong>{" "}
                {assessmentQuestions[currentQuestion - 1]}
              </p>

              <div className="slider-wrapper">
                <div className="slider-labels">
                  <span>0</span>
                  <span className="current-bubble">
                    {answers[`q${currentQuestion}`]}
                  </span>
                  <span>100</span>
                </div>

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
                />

                <div className="slider-labels">
                  <small>Barely anything</small>
                  <small>Almost everything</small>
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

          {/* STEP 3 */}
          {addStep === 3 && (
            <div className="step-content complete-view" style={{ textAlign: "center" }}>
              <h2 className="modal-title">Assessment Complete</h2>
              <p className="modal-sub">
                Topic : <strong>{topicName}</strong>
              </p>

              <p className="score-announcement">
                Your Memory Score is <span>{scoreValue}%</span>
              </p>

              <button className="primary-btn" onClick={resetAddModal}>
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default TopicList;
