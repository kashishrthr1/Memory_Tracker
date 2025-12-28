import ListItem from "./ListItem";

const MOCK_DATA = [
  {
    id: 1,
    name: "Photosynthesis",
    date: "10 Apr 2025",
    score: 82,
    revisions: 5,
    lastRevision: "08 Apr 2025",
    nextRevision: "12 Apr 2025",
  },
  {
    id: 2,
    name: "React Hooks",
    date: "12 Apr 2025",
    score: 94,
    revisions: 12,
    lastRevision: "11 Apr 2025",
    nextRevision: "14 Apr 2025",
  },
  {
    id: 3,
    name: "Quantum Mechanics",
    date: "05 Apr 2025",
    score: 45,
    revisions: 2,
    lastRevision: "06 Apr 2025",
    nextRevision: "07 Apr 2025",
  },
  {
    id: 4,
    name: "World War II",
    date: "15 Mar 2025",
    score: 72,
    revisions: 8,
    lastRevision: "10 Apr 2025",
    nextRevision: "18 Apr 2025",
  },
];

const TopicList = () => {
  // Automatically sort by score (lowest score first = most urgent)
  const sortedTopics = [...MOCK_DATA].sort((a, b) => a.score - b.score);

  return (
    <section className="topic-list box">
      <h2 className="section-title">Topic List</h2>

      <div className="topic-actions">
        <button className="add-topic-btn">+ Add Topic</button>
        <div className="search-bar">
          <input type="text" placeholder="Search topic..." />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="topic-labels">
        <span>Name</span>
        <span>Date</span>
        <span>Memory Score</span>
      </div>

      <div className="topic-items">
        {sortedTopics.map((topic, index) => (
          <ListItem key={topic.id} index={index + 1} {...topic} />
        ))}
      </div>
    </section>
  );
};

export default TopicList;
