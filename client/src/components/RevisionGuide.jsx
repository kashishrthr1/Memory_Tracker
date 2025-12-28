// import "./dashboard.css";

const revisionData = [
  {
    day: "Today",
    topics: ["Graphs", "DP Basics", "React Hooks"],
  },
  {
    day: "Tomorrow",
    topics: ["Binary Trees"],
  },
  {
    day: "Monday",
    topics: [],
  },
  {
    day: "Tuesday",
    topics: ["DBMS Indexing", "Normalization"],
  },
  {
    day: "Wednesday",
    topics: ["OS Scheduling"],
  },
];

const RevisionGuide = () => {
  return (
    <section className="revision-guide box">
      <h2 className="section-title">Revision Guide</h2>

      <div className="revision-cards">
        {revisionData.map((item) => (
          <div
            key={item.day}
            className={`revision-card ${
              item.day === "Today" ? "today-card" : ""
            }`}
          >
            <div className="revision-card-header">{item.day}</div>

            <div className="revision-card-body">
              {item.topics.length === 0 ? (
                <p className="no-topics">No revisions</p>
              ) : (
                <ul>
                  {item.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RevisionGuide;
