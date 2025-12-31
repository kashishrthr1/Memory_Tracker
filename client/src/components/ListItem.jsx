import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Modal from "./Modal";
import { reviseTopic } from "../api/topic";

const ListItem = ({ _id, index, name, createdAt, memoryScore, revisionCount, lastRevisedAt, nextRevisionDate, onRefresh }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviseOpen, setIsReviseOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [reviseStep, setReviseStep] = useState(1);
  const [answers, setAnswers] = useState({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });

  const handleFinishRevision = async () => {
    try {
      await reviseTopic(_id, answers);
      onRefresh(); // Re-fetch all topics to show updated scores/decay
      closeReviseModal();
    } catch (err) {
      alert("Error updating revision");
    }
  };

  const closeReviseModal = () => {
    setIsReviseOpen(false);
    setReviseStep(1);
    setCurrentQuestion(1);
    setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
  };

  const urgencyClass = memoryScore < 40 ? "hard" : memoryScore < 75 ? "medium" : "easy";

  return (
    <>
      <div className="list-item">
        <div className="list-left">
          <span className="serial">{index}</span>
          <span className={`difficulty-strip ${urgencyClass}`} />
          <span className="topic-name">{name}</span>
          <span className="topic-date">{new Date(createdAt).toLocaleDateString()}</span>
          <span className="topic-score">{memoryScore}%</span>
        </div>

        <div className="right-actions">
          <button className="more-btn" onClick={() => setIsDetailsOpen(true)}><MoreVertical size={18} /></button>
          <div className="revise-area" onClick={() => setIsReviseOpen(true)}>Revise</div>
        </div>
      </div>

      {/* REVISION FLOW MODAL */}
      <Modal isOpen={isReviseOpen} onClose={closeReviseModal}>
        <div className="add-flow-container">
          {reviseStep === 1 ? (
            <div className="step-content assessment-view">
              <h2 className="modal-title">Revising: {name}</h2>
              <div className="question-area">
                <p className="q-text"><strong>Q{currentQuestion}</strong> Rate your current recall after revision:</p>
                <input
                  type="range" min="0" max="100"
                  value={answers[`q${currentQuestion}`]}
                  onChange={(e) => setAnswers({...answers, [`q${currentQuestion}`]: parseInt(e.target.value)})}
                  className="assessment-slider"
                />
              </div>
              <div className="assessment-footer">
                <button className="primary-btn" onClick={() => currentQuestion < 5 ? setCurrentQuestion(c => c+1) : setReviseStep(2)}>Next</button>
              </div>
            </div>
          ) : (
            <div className="step-content complete-view" style={{ textAlign: "center" }}>
              <h2>Revision Recorded</h2>
              <button className="primary-btn" onClick={handleFinishRevision}>Sync with Memory</button>
            </div>
          )}
        </div>
      </Modal>

      {/* TOPIC DETAILS MODAL */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <div className="topic-modal">
          <h2 className="modal-title">{name} Details</h2>
          <div className="modal-info-grid">
            <div className="info-card"><p>Memory Score</p><h3>{memoryScore}%</h3></div>
            <div className="info-card"><p>Total Revisions</p><h3>{revisionCount}</h3></div>
            <div className="info-card"><p>Next Recommended</p><h3 className="highlight">{new Date(nextRevisionDate).toLocaleDateString()}</h3></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListItem;