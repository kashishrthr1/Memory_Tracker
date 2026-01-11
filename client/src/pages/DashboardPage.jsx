

// export default DashboardPage;
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import TopicList from "../components/TopicList";
import RevisionGuide from "../components/RevisionGuide";
import RecentActivity from "../components/RecentActivity";
import Footer from "../components/Footer";
import useAutoLogout from "../hooks/useAutoLogout";
import "../styles/dashboard.css";

// 1. Function import bilkul sahi hai
import { getWeeklyAverageMemoryScore,fetchTopics,getRecentActivities} from "../api/topic";

const DashboardPage = () => {
  useAutoLogout(30);
 const [stats, setStats] = useState({ score: 0, trend: 0 });
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [topics, setTopics] = useState([]); // Add state for topics

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // 1. LocalStorage se user nikalna aur correct key (username) use karna
    const storedUserStr = localStorage.getItem("user");

    if (storedUserStr && storedUserStr !== "undefined") {
      try {
        const storedUser = JSON.parse(storedUserStr);

        // Aapke backend response ke mutabik key 'username' hai
        const displayName = storedUser?.username || storedUser?.name || "Student";

        // Split tabhi karein jab naam maujood ho
        setUserName(displayName.split(" ")[0]);
      } catch (err) {
        console.error("User parsing error:", err);
        setUserName("Student");
      }
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Weekly Stats
      const statsRes = await getWeeklyAverageMemoryScore();
      setStats({
        score: statsRes.data.averageWeeklyMemoryScore,
        trend: statsRes.data.trend
      });

      // 2. Fetch Topics for the Milestone logic
      // Assuming you have a fetchTopics API function
      const topicsRes = await fetchTopics(); 
      setTopics(topicsRes.data);

      const activityRes=await getRecentActivities();
      setActivities(activityRes.data);

    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Listen for events to refresh data
    window.addEventListener("refreshDashboardData", fetchDashboardData);
    return () => window.removeEventListener("refreshDashboardData", fetchDashboardData);
  }, []);

  // 3. Logic to find the Next Milestone Topic
  // We sort by currentScore (lowest first) to find the most urgent topic
  const sortedTopics = [...topics].sort((a, b) => (a.currentScore || 0) - (b.currentScore || 0));
  const topTopic = sortedTopics[0];

  const nextTopicData = topTopic ? {
    name: topTopic.topicName,
    nextRevision: topTopic.optimalRevisionDate 
      ? new Date(topTopic.optimalRevisionDate).toLocaleDateString('en-GB') 
      : "Pending",
    id: topTopic._id
  } : null;

  return (
    <div className="app-container">
      <Navbar />
      <main className="dashboard-container">
        {/* Pass nextTopicData to Overview */}
        <Overview 
          score={loading ? 0 : stats.score} 
          trend={loading ? 0 : stats.trend}
          userName={userName} 
          nextTopic={nextTopicData}
        />

        {/* Pass topics and refresh function to TopicList so it doesn't fetch independently */}
        <TopicList topics={topics} onRefresh={fetchDashboardData} />
        
        <RevisionGuide />
        <RecentActivity activities={activities}/>
      </main>
      <Footer />
    </div>
  );
};

  export default DashboardPage;