import React from "react";
import { RotateCcw, Plus } from "lucide-react";

// Receive 'activities' as a prop from DashboardPage
const RecentActivity = ({ activities = [] }) => {
  
  // Helper to format the backend date (ISO string) into "Today", "Yesterday", etc.
  const formatActivityDate = (dateString) => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffInTime = now.getTime() - activityDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  return (
    <section className="recent-activity box">
      <h2 className="section-title">Recent Activity</h2>

      <div className="activity-list">
        {/* Check if there are no activities yet */}
        {activities.length === 0 ? (
          <div className="activity-item">
            <div className="activity-content">
              <p className="activity-text" style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                No activities found. Start learning to see your progress!
              </p>
            </div>
          </div>
        ) : (
          activities.map((item) => (
            <div className="activity-item" key={item._id}>
              {/* Purple strip — FULL HEIGHT (Using your existing CSS) */}
              <div className="activity-icon">
                {item.activityType === "revised" ? (
                  <RotateCcw size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </div>

              {/* Content mapping backend fields to your styles */}
              <div className="activity-content">
                <span className="activity-date">{formatActivityDate(item.createdAt)}</span>

                <p className="activity-text">
                  {item.activityType === "revised" ? (
                    <>
                      Revised <strong>{item.topicName}</strong> to increase the memory score by{" "}
                      <span className="activity-highlight">{item.scoreChange}</span>
                    </>
                  ) : (
                    <>
                      Added a new topic{" "}
                      <span className="activity-highlight">{item.topicName}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
