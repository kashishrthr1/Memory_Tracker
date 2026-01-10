import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { reviseTopic } from "../api/topic";

const assessmentQuestions = [
  "If you had to explain this topic to someone right now, how confident are you?",
  "How easily could you recall the key points without looking at your notes?",
  "How well do you understand the core concepts behind this topic?",
  "How comfortable are you applying this knowledge to a practical problem?",
  "How clearly do you remember the specific details and nuances of this topic?"
];

const RevisionModal = ({ isOpen, onClose, topicId, topicName }) => {
  const [answers, setAnswers] = useState({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
  const [step, setStep] = useState(1);
  const [currentQ, setCurrentQ] = useState(1);
  const [finalScore, setFinalScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCurrentQ(1);
      setAnswers({ q1: 50, q2: 50, q3: 50, q4: 50, q5: 50 });
    }
  }, [isOpen]);

  const handleNext = async () => {
    if (currentQ < 5) {
      setCurrentQ(prev => prev + 1);
    } else {
      setIsCalculating(true);
      setStep(2);
      try {
        const responseArray = [answers.q1, answers.q2, answers.q3, answers.q4, answers.q5];
        const res = await reviseTopic(topicId, { assessmentResponses: responseArray });
        setFinalScore(res.data.currentScore);
        
        window.dispatchEvent(new Event("refreshDashboardData"));
        window.dispatchEvent(new Event("refreshCalendar"));
      } catch (err) {
        console.error("Revision Error:", err);
      } finally {
        setIsCalculating(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-flow-container">
        {step === 1 ? (
          <div className="step-content assessment-view">
             <h2 className="modal-title">Revision Assessment</h2>
             <p className="modal-sub">Topic: <strong>{topicName}</strong></p>
             <div className="question-area">
                <p className="q-text"><strong>Q{currentQ}</strong> {assessmentQuestions[currentQ - 1]}</p>
                <div className="slider-wrapper">
                   <div className="slider-labels">
                      <span>0</span>
                      <span className="current-bubble">{answers[`q${currentQ}`]}</span>
                      <span>100</span>
                   </div>
                   <input
                      type="range" min="0" max="100"
                      value={answers[`q${currentQ}`]}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [`q${currentQ}`]: Number(e.target.value) }))}
                      className="assessment-slider"
                   />
                </div>
             </div>
             <div className="assessment-footer">
                <button className="primary-btn" onClick={handleNext}>Next</button>
             </div>
          </div>
        ) : (
          <div className="step-content complete-view" style={{ textAlign: "center" }}>
            <h2 className="modal-title">Complete!</h2>
            {isCalculating ? <p>Analyzing...</p> : <p className="score-announcement">New Score: <span>{finalScore}%</span></p>}
            <button className="primary-btn" onClick={onClose}>Dashboard</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RevisionModal;