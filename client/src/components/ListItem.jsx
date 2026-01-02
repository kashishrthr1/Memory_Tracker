import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import MemoryGraph from "./MemoryGraph";
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
  onUpdateScore,
}) => {
  const [answers, setAnswers] = useState({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviseOpen, setIsReviseOpen] = useState(false);
  const [reviseStep, setReviseStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [finalScore, setFinalScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Graph data - Filhal static hai, baad mein API data se replace kar sakte hain
  const graphData = [
    { score: score, date: "Today" },
    { score: 75, date: "Prev" },
  ];

  useEffect(() => {
    if (isReviseOpen) {
      setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
      setCurrentQuestion(1);
    }
  }, [isReviseOpen]);

  const handleNextQuestion = async () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCalculating(true);
      setReviseStep(2); 
      try {
        const res = await reviseTopic(id, answers);
        const updatedTopicFromBackend = res.data.topic; 
        setFinalScore(updatedTopicFromBackend.memoryScore);
        window.dispatchEvent(new Event("refreshCalendar"));
        onUpdateScore(updatedTopicFromBackend); 
      } catch (err) {
        console.error("Error updating score:", err);
      } finally {
        setIsCalculating(false);
      }
    }
  };

  const getUrgency = (s) => {
    if (s < 60) return "hard";
    if (s < 85) return "medium";
    return "easy";
  };

  const urgency = getUrgency(score);

  const closeReviseModal = () => {
    setIsReviseOpen(false);
    setTimeout(() => {
      setReviseStep(1);
      setCurrentQuestion(1);
      setFinalScore(null);
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
                <MemoryGraph data={graphData} />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isReviseOpen} onClose={closeReviseModal}>
        <div className="add-flow-container">
          {reviseStep === 1 && (
            <div className="step-content assessment-view">
              <h2 className="modal-title">Revision</h2>
              <p className="q-text"><strong>Q{currentQuestion}</strong> {assessmentQuestions[currentQuestion - 1]}</p>
              <input
                type="range" min="0" max="100"
                value={answers[`q${currentQuestion}`]}
                onChange={(e) => setAnswers(prev => ({ ...prev, [`q${currentQuestion}`]: Number(e.target.value) }))}
                className="assessment-slider"
              />
              <div className="assessment-footer">
                <button className="primary-btn" onClick={handleNextQuestion}>Next</button>
              </div>
            </div>
          )}
          {reviseStep === 2 && (
            <div className="step-content complete-view" style={{ textAlign: "center" }}>
              <h2 className="modal-title">Complete!</h2>
              <div className="final-score-area">
                {isCalculating ? <p>Calculating...</p> : <h3>New Score: {finalScore}%</h3>}
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