// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Overview from "../components/Overview";
// import TopicList from "../components/TopicList";
// import RevisionGuide from "../components/RevisionGuide";
// import RecentActivity from "../components/RecentActivity";
// import "../styles/dashboard.css";

// const DashboardPage = () => {
//   return (
//     <div className="app-container">
//       <Navbar />

//       <main className="dashboard-container">
//         <Overview score={72} />
//         <TopicList />
//         <RevisionGuide />
//         <RecentActivity></RecentActivity>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default DashboardPage;
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import TopicList from "../components/TopicList";
import RevisionGuide from "../components/RevisionGuide";
import RecentActivity from "../components/RecentActivity";
import Footer from "../components/Footer";
import "../styles/dashboard.css";

// 1. Function import bilkul sahi hai
import { getWeeklyAverageMemoryScore } from "../api/topic"; 

const DashboardPage = () => {
  const [weeklyScore, setWeeklyScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 2. Fix: Yahan 'api.get' ki jagah imported function use karein
        const response = await getWeeklyAverageMemoryScore();
        
        // 3. Backend se data set karein
        setWeeklyScore(response.data.averageMemoryScore);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="dashboard-container">
        {/* Jab tak loading hai, score 0 rahega phir animate hoga */}
        <Overview score={loading ? 0 : weeklyScore} />
        
        <TopicList />
        <RevisionGuide />
        <RecentActivity />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;