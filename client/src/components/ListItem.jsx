import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Modal from "./Modal";
import { reviseTopic } from "../api/topic";
const assessmentQuestions = [
  "If you had to explain this topic to someone right now, how confident are you?",
  "How easily could you recall the key points without looking at your notes?",
  "How well do you understand the core concepts behind this topic?",
  "How comfortable are you applying this knowledge to a practical problem?",
  "How clearly do you remember the specific details and nuances of this topic?"
];
const ListItem = ({
  id,
  index,
  name,
  date,
  score,
  revisions,
  lastRevision,
  nextRevision,
  onUpdateScore, // Received from TopicList
}) => {
  // States for two different modals
  const [answers, setAnswers] = useState({
    q1: score,
    q2: score,
    q3: score,
    q4: score,
    q5: score,
  });

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviseOpen, setIsReviseOpen] = useState(false);

  // States for the revision flow
  const [reviseStep, setReviseStep] = useState(1); // 1: Questions, 2: Complete
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [newScoreValue, setNewScoreValue] = useState(score);
const [finalScore, setFinalScore] = useState(null);
const [isCalculating, setIsCalculating] = useState(false);

useEffect(() => {
  if (isReviseOpen) {
    // Reset answers and questions when modal opens
    setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
    setCurrentQuestion(1);
  }
}, [isReviseOpen]);

// ListItem.jsx ke andar handleNextQuestion function
const handleNextQuestion = async () => {
  if (currentQuestion < 5) {
    setCurrentQuestion((prev) => prev + 1);
  } else {
    setIsCalculating(true);
    setReviseStep(2); 

    try {
      const res = await reviseTopic(id, answers);
      const updatedTopicFromBackend = res.data; // Yeh sabse accurate score hai
      
      setFinalScore(updatedTopicFromBackend.memoryScore);
       window.dispatchEvent(new Event("refreshCalendar"));
      // IMPORTANT: Dashboard ko wahi data bhejein jo backend ne diya hai
      onUpdateScore(updatedTopicFromBackend); 
      
    } catch (err) {
      console.error("Error updating score:", err);
    } finally {
      setIsCalculating(false);
    }
  }
};
  // Auto-assign urgency based on score
  const getUrgency = (s) => {
    if (s < 60) return "hard";
    if (s < 85) return "medium";
    return "easy";
  };

  const urgency = getUrgency(score);

  // Handle Scroll Lock
  useEffect(() => {
    if (isDetailsOpen || isReviseOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDetailsOpen, isReviseOpen]);

  // Revision Logic
  

  const handleFinishRevision = () => {
    onUpdateScore(id, answers);
    closeReviseModal();
  };

  const closeReviseModal = () => {
    setIsReviseOpen(false);
    setTimeout(() => {
      setReviseStep(1);
      setCurrentQuestion(1);
      setNewScoreValue(score);
    }, 300);
  };

  return (
    <>
      <div className="list-item">
        <div className="list-left">
          <span className="serial">{index}</span>
          <span className={`difficulty-strip ${urgency}`} />
          <span className="topic-name">{name}</span>
          <span className="topic-date">{nextRevision}</span>
          <span className="topic-score">{score}%</span>
        </div>

        <div className="right-actions">
          <button className="more-btn" onClick={() => setIsDetailsOpen(true)}>
            <MoreVertical size={18} />
          </button>
          <div className="revise-area" onClick={() => setIsReviseOpen(true)}>
            Revise
          </div>
        </div>
      </div>

      {/* --- MODAL 1: TOPIC DETAILS --- */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <div className="topic-modal">
          <div className="modal-header">
            <h2 className="modal-title">
              Topic Name : <span>{name}</span>
            </h2>
            <p className="modal-sub">First added at {date}</p>
          </div>

          <div className="modal-body">
            <div className="modal-score-box">
              <span className={`difficulty-strip ${urgency}`} />
              <div className="score-text">
                <p>Your Memory Score for this topic is</p>
                <span className="score-value">{score}%</span>
              </div>
              <div className="score-chart">
                <div className="pie-placeholder">Pie</div>
              </div>
            </div>

            <div className="modal-info-grid">
              <div className="info-card">
                <p className="info-label">Number of Revisions</p>
                <p className="info-value">{revisions}</p>
              </div>
              <div className="info-card">
                <p className="info-label">Last Revision</p>
                <p className="info-value">{lastRevision}</p>
              </div>
              <div className="info-card full">
                <p className="info-label">Next Recommended Revision</p>
                <p className="info-value highlight">{nextRevision}</p>
              </div>

              <div className="modal-graph-section full">
                <h3 className="section-subtitle">Memory Graph</h3>
                <div className="graph-placeholder">
                  Visualizing {name} ({urgency} urgency)
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* --- MODAL 2: REVISE ASSESSMENT FLOW --- */}
      <Modal isOpen={isReviseOpen} onClose={closeReviseModal}>
        <div className="add-flow-container">
          {reviseStep === 1 && (
            <div className="step-content assessment-view">
              <div className="assessment-header">
                <h2 className="modal-title">Revision Assessment</h2>
                <p className="modal-sub">
                  Topic : <strong>{name}</strong>
                </p>
              </div>

              <div className="question-area">
                <p className="q-text">
                <strong>Q{currentQuestion}</strong> {assessmentQuestions[currentQuestion - 1]}
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

          {reviseStep === 2 && (
  <div className="step-content complete-view" style={{ textAlign: "center" }}>
    <h2 className="modal-title">Revision Complete</h2>
    <p className="modal-sub">Topic: <strong>{name}</strong></p>

    <div className="final-score-area">
      {isCalculating ? (
        <div className="calculating-box">
          <p>Analyzing your answers...</p>
          {/* Aap yahan koi chota CSS loader daal sakte hain */}
        </div>
      ) : (
        <>
          <p className="score-announcement">
            New Memory Score: <span>{finalScore}%</span>
          </p>
          <div className="progress-circle-mock">
            {finalScore}%
          </div>
          <p className="info-sub">
            Your retention data has been successfully updated based on today's performance.
          </p>
        </>
      )}
    </div>

    <button 
      className="primary-btn" 
      onClick={closeReviseModal}
      disabled={isCalculating}
    >
      Go to Dashboard
    </button>
  </div>
)}
        </div>
      </Modal>
    </>
  );
};

export default ListItem;