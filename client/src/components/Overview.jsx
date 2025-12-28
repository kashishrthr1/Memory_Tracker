// import "..styles/dashboard.css";

const Overview = ({ score = 72 }) => {
  return (
    <section className="overview">
      {/* Top 2:1 grid */}
      <div className="overview-top">
        {/* Left (2fr) */}
        <div className="overview-text box">
          <h1>Welcome back, Kashish</h1>
          <p className="score-text">
            Your weekly memory score is{" "}
            <span className="highlight">{score}%</span>
          </p>
          <p className="score-subtext">That’s 10% higher then last week </p>
        </div>

        {/* Right (1fr) */}
        <div className="overview-chart box">
          {/* Placeholder for pie chart */}
          <div className="pie-placeholder">{score}%</div>
        </div>
      </div>

      {/* Bottom 1:1 grid */}
      <div className="overview-bottom">
        {/* Left */}
        <div className="box">
          <div className="line-placeholder">Line graph placeholder</div>
        </div>

        {/* Right */}
        <div className="box revision-box">
          {/* <br /> */}
          <p>
            <span className="label">Next Revision : </span>{" "}
            <span className="highlight2">Topic Name</span>
          </p>

          <p>
            <span className="label">Date : </span>{" "}
            <span className="highlight2">Revision Date</span>
          </p>

          <p className="revise-question">Revise now?</p>

          <p>
            <button className="btn-primary revise-btn">Revise</button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
