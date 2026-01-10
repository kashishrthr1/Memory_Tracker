
import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import MemoryGraph from "./MemoryGraph"; // Imported for details view
import { reviseTopic,getTopicHistory,deleteTopic} from "../api/topic";

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
  onUpdateScore, 
}) => {
  const [answers, setAnswers] = useState({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviseOpen, setIsReviseOpen] = useState(false);
  const [reviseStep, setReviseStep] = useState(1); 
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [finalScore, setFinalScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await getTopicHistory(id);
      
      // Backend data format: [{ memoryScore: 85, date: "2026-01-09..." }]
      // Isse formatted format mein convert karein jo MemoryGraph samajh sake
      const formatted = res.data.map(item => ({
        score: item.memoryScore,
        // Date ko "9 Jan" jaise format mein convert karein
        date: new Date(item.date).toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'short' 
        })
      }));
      
      setHistoryData(formatted);
    } catch (err) {
      console.error("Failed to fetch topic history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (isDetailsOpen) {
      fetchHistory();
    }
  }, [isDetailsOpen]);

  // Graph data update logic
  

  useEffect(() => {
    if (isReviseOpen) {
      setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
      setCurrentQuestion(1);
      setReviseStep(1);
    }
  }, [isReviseOpen]);

  // Handle Scroll Lock jab modal open ho
  useEffect(() => {
    document.body.style.overflow = (isDetailsOpen || isReviseOpen) ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isDetailsOpen, isReviseOpen]);

  const handleNextQuestion = async () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCalculating(true);
      setReviseStep(2); 
      try {
        const responseArray = [answers.q1, answers.q2, answers.q3, answers.q4, answers.q5];
      
      // Backend expects: { assessmentResponses: [n1, n2, n3, n4, n5] }
      const res = await reviseTopic(id, { assessmentResponses: responseArray });
       
        const updatedTopicFromBackend = res.data; 
        

        setFinalScore(updatedTopicFromBackend.currentScore);

      window.dispatchEvent(new Event("refreshCalendar"));
      window.dispatchEvent(new Event("refreshDashboardData"));
        onUpdateScore(updatedTopicFromBackend); 
      } catch (err) {
        console.error("Error updating score:", err);
      } finally {
        setIsCalculating(false);
      }
    }
  };

  const closeReviseModal = () => {
    setIsReviseOpen(false);
    setTimeout(() => {
      setReviseStep(1);
      setCurrentQuestion(1);
      setFinalScore(null);
    }, 300);
  };

  const getUrgency = (s) => {
    if (s < 60) return "hard";
    if (s < 85) return "medium";
    return "easy";
  };

  const urgency = getUrgency(score);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteTopic(id);
        
        // Refresh the dashboard list
        window.dispatchEvent(new Event("refreshDashboardData"));
        
        // Close modal if it was open
        setIsDetailsOpen(false);
        
        alert("Topic deleted successfully");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete topic");
      }
    }
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

      {/* MODAL 1: DETAILS */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <div className="topic-modal">
          <div className="modal-header">
            <h2 className="modal-title">Topic: <span>{name}</span></h2>
            <p className="modal-sub">First added at {date}</p>
          </div>
          <div className="modal-body">
            <div className="modal-score-box">
              <span className={`difficulty-strip ${urgency}`} />
              <div className="score-text">
                <p>Memory Score</p>
                <span className="score-value">{score}%</span>
              </div>
            </div>
            <div className="modal-info-grid">
              <div className="info-card"><p>Revisions</p><p className="info-value">{revisions}</p></div>
              <div className="info-card"><p>Last Revision</p><p className="info-value">{lastRevision}</p></div>
              <div className="info-card full"><p>Next Revision</p><p className="info-value highlight">{nextRevision}</p></div>
              <div className="modal-graph-section full">
                <h3>Memory Graph</h3>
                <MemoryGraph data={historyData} />
              </div>
            </div>
              <div className="modal-footer-actions">
                   <button className="delete-minimal-btn" onClick={handleDelete}>
                 <Trash2 size={14} />
                 <span>Delete Topic</span>
                 </button>
                </div>


          </div>
        </div>
      </Modal>

      {/* MODAL 2: REVISE FLOW */}
      <Modal isOpen={isReviseOpen} onClose={closeReviseModal}>
        <div className="add-flow-container">
          {reviseStep === 1 && (
            <div className="step-content assessment-view">
              <h2 className="modal-title">Revision Assessment</h2>
              <p className="modal-sub">Topic: <strong>{name}</strong></p>
              
              <div className="question-area">
                <p className="q-text"><strong>Q{currentQuestion}</strong> {assessmentQuestions[currentQuestion - 1]}</p>
                <div className="slider-wrapper">
                  <div className="slider-labels">
                    <span>0</span>
                    <span className="current-bubble">{answers[`q${currentQuestion}`]}</span>
                    <span>100</span>
                  </div>
                  <input
                    type="range" min="0" max="100"
                    value={answers[`q${currentQuestion}`]}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [`q${currentQuestion}`]: Number(e.target.value) }))}
                    className="assessment-slider"
                  />
                  <div className="slider-labels">
                    <small>Barely anything</small>
                    <small>Almost everything</small>
                  </div>
                </div>
              </div>

              <div className="assessment-footer">
                <p>Question {currentQuestion} of 5</p>
                <button className="primary-btn" onClick={handleNextQuestion}>Next</button>
              </div>
            </div>
          )}

          {reviseStep === 2 && (
            <div className="step-content complete-view" style={{ textAlign: "center" }}>
              <h2 className="modal-title">Complete!</h2>
              <div className="final-score-area">
                {isCalculating ? (
                  <p className="calculating-box">Analyzing your answers...</p>
                ) : (
                  <>
                    <p className="score-announcement">New Memory Score: <span>{finalScore}%</span></p>
                    <div className="progress-circle-mock">{finalScore}%</div>
                    <p className="info-sub">Your retention data has been updated.</p>
                  </>
                )}
              </div>
              <button className="primary-btn" onClick={closeReviseModal} disabled={isCalculating}>Dashboard</button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ListItem;