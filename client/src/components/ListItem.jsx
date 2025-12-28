import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Modal from "./Modal";

import { useEffect } from "react";
const ListItem = ({
  index = 1,
  difficulty = "medium",
  name = "Topic Name",
  date = "12 Apr 2025",
  score = "88%",
}) => {
  const [open, setOpen] = useState(false);

  // Inside your ListItem component:
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <div className="list-item">
        <div className="list-left">
          <span className="serial">{index}</span>
          <span className={`difficulty-strip ${difficulty}`} />
          <span className="topic-name">{name}</span>
          <span className="topic-date">{date}</span>
          <span className="topic-score">{score}</span>
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
          {/* STICKY HEADER */}
          <div className="modal-header">
            <h2 className="modal-title">
              Topic Name : <span>{name}</span>
            </h2>

            <p className="modal-sub">First added at {date}</p>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="modal-body">
            {/* Score section */}
            <div className="modal-score-box">
              <div className="score-text">
                <p>Your Memory Score for this topic is</p>
                <span className="score-value">88%</span>
              </div>

              <div className="score-chart">
                <div className="pie-placeholder">Pie</div>
              </div>
            </div>

            {/* PERFECT RECTANGLE GRID */}
            <div className="modal-info-grid">
              <div className="info-card">
                <p className="info-label">Number of Revisions</p>
                <p className="info-value">12</p>
              </div>

              <div className="info-card">
                <p className="info-label">Last Revision</p>
                <p className="info-value">10 Apr 2025</p>
              </div>

              <div className="info-card full">
                <p className="info-label">Next Recommended Revision</p>
                <p className="info-value highlight">14 Apr 2025</p>
              </div>

              {/* NEW: Memory Graph Section */}
              <div className="modal-graph-section">
                <h3 className="section-subtitle">Memory Graph</h3>
                <div className="graph-placeholder">
                  <div className="chart-mockup">
                    {/* You can put an SVG or Chart component here later */}
                    Graph Visualization Placeholder
                  </div>
                </div>
              </div>
            </div>

            {/* More content will go here later */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListItem;
