import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Overview from "../components/Overview";
import TopicList from "../components/TopicList";
import RevisionGuide from "../components/RevisionGuide";
import RecentActivity from "../components/RecentActivity";
import "../styles/dashboard.css";

const DashboardPage = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="dashboard-container">
        <Overview score={72} />
        <TopicList />
        <RevisionGuide />
        <RecentActivity></RecentActivity>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
