const Features = () => (
  <div className="content-section">
    <div className="about-grid">
      <div className="placeholder-img"></div>
      <div>
        <h3>About Us</h3>
        <p>
          This is our about section, we are so cool and crazy... just waiting
          for you to use us.
        </p>
        <p>
          <strong>
            It will be worth it my doug, you will not regret the decision.
          </strong>
        </p>
      </div>
    </div>
    <h3>Features</h3>
    <div className="features-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="feature-card">
          <div className="feature-box"></div>
          <p>It will be worth it my doug, you will not regret the decision.</p>
        </div>
      ))}
    </div>
  </div>
);
export default Features;
