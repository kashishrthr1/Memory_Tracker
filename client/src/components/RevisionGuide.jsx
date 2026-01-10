// import "./dashboard.css";
import React, { useEffect, useState, useCallback } from "react";
import { getRevisionCalendar } from "../api/topic";

const RevisionGuide = () => {
  const [calendarData, setCalendarData] = useState({});

  // STEP 1: Pehle function define karein (useCallback ke saath)
  const loadCalendar = useCallback(async () => {
    try {
      const res = await getRevisionCalendar();
      setCalendarData(res.data);
    } catch (err) {
      console.error("Calendar fetch error:", err);
    }
  }, []); // Empty dependency array

  // STEP 2: Ab useEffect mein use call karein
  useEffect(() => {
    loadCalendar(); // Yeh ab work karega kyunki upar defined hai

    const handleRefresh = () => {
      loadCalendar();
    };

    window.addEventListener("refreshCalendar", handleRefresh);
    
    return () => {
      window.removeEventListener("refreshCalendar", handleRefresh);
    };
  }, [loadCalendar]); // Dependency mein loadCalendar daalein

  // getDayLabel helper
  const getDayLabel = (dateStr) => {
  // Local dates calculate karein compare karne ke liye
  const today = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD"
  
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toLocaleDateString('en-CA');

  // Comparison logic based on actual date strings, not index
  if (dateStr === today) return "Today";
  if (dateStr === tomorrow) return "Tomorrow";
  
  // Baaki dino ke liye Day Name (e.g., Friday)
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
};

  return (
    <section className="revision-guide box">
      <h2 className="section-title">Revision Guide</h2>
      <div className="revision-cards">
        {Object.entries(calendarData).map(([dateKey, topics], index) => (
          <div key={dateKey} className={`revision-card ${getDayLabel(dateKey) === "Today" ? "today-card" : ""}`}>
            <div className="revision-card-header">{getDayLabel(dateKey)}</div>
            <div className="revision-card-body">
              {topics.length === 0 ? (
                <p className="no-topics">No revisions</p>
              ) : (
                <ul>
                  {topics.map((topic) => (
                    <li key={topic.id}><span className="dot" />{topic.name}</li>
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