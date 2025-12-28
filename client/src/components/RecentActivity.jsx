import { RotateCcw, Plus } from "lucide-react";

const activityData = [
  {
    type: "revise",
    date: "Today",
    text: "Revised Two Pointers to increase the memory score by",
    value: "+10%",
  },
  {
    type: "add",
    date: "Yesterday",
    text: "Added a new topic",
    value: "Dynamic Programming",
  },
  {
    type: "revise",
    date: "2 days ago",
    text: "Revised Graph Traversals to increase the memory score by",
    value: "+8%",
  },
  {
    type: "add",
    date: "3 days ago",
    text: "Added a new topic",
    value: "DBMS Indexing",
  },
];

const RecentActivity = () => {
  return (
    <section className="recent-activity box">
      <h2 className="section-title">Recent Activity</h2>

      <div className="activity-list">
        {activityData.map((item, index) => (
          <div className="activity-item" key={index}>
            {/* Purple strip — FULL HEIGHT */}
            <div className="activity-icon">
              {item.type === "revise" ? (
                <RotateCcw size={18} />
              ) : (
                <Plus size={18} />
              )}
            </div>

            {/* Content */}
            <div className="activity-content">
              <span className="activity-date">{item.date}</span>

              <p className="activity-text">
                {item.text}{" "}
                <span className="activity-highlight">{item.value}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
