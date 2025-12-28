import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Modal from "./Modal";

const ListItem = ({
  index,
  name,
  date,
  score,
  revisions,
  lastRevision,
  nextRevision,
}) => {
  const [open, setOpen] = useState(false);

  // Auto-assign urgency based on score
  const getUrgency = (s) => {
    if (s < 60) return "hard"; // Critical/Urgent
    if (s < 85) return "medium"; // Needs review
    return "easy"; // Good retention
  };

  const urgency = getUrgency(score);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <div className="list-item">
        <div className="list-left">
          <span className="serial">{index}</span>
          <span className={`difficulty-strip ${urgency}`} />
          <span className="topic-name">{name}</span>
          <span className="topic-date">{date}</span>
          <span className="topic-score">{score}%</span>
        </div>

        <div className="right-actions">
          <button className="more-btn" onClick={() => setOpen(true)}>
            <MoreVertical size={18} />
          </button>
          <div className="revise-area">Revise</div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="topic-modal">
          <div className="modal-header">
            <h2 className="modal-title">
              Topic Name : <span>{name}</span>
            </h2>
            <p className="modal-sub">First added at {date}</p>
          </div>

          <div className="modal-body">
            <div className="modal-score-box">
              {/* NEW: Urgency strip inside the score box */}
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
    </>
  );
};

export default ListItem;
