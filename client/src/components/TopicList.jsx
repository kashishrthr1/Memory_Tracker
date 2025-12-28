import ListItem from "./ListItem";
// import "./dashboard.css";

const TopicList = () => {
  return (
    <section className="topic-list box">
      {/* Header */}
      <h2 className="section-title">Topic List</h2>

      {/* Actions row */}
      <div className="topic-actions">
        <button className="add-topic-btn">+ Add Topic</button>

        <div className="search-bar">
          <input type="text" placeholder="Search topic..." />
          <button className="search-btn">Search</button>
        </div>
      </div>

      {/* Labels */}
      <div className="topic-labels">
        <span>Name</span>
        <span>Date</span>
        <span>Memory Score</span>
      </div>

      {/* List */}
      <div className="topic-items">
        {[1, 2, 3, 4].map((item) => (
          <ListItem
            key={item}
            index={item}
            difficulty={item === 1 ? "hard" : item === 2 ? "medium" : "easy"}
            name="Sample Topic"
            date="12 Apr 2025"
            score="72%"
          />
        ))}
      </div>
    </section>
  );
};

export default TopicList;
