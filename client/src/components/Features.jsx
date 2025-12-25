const Features = () => (
  <div className="content-section">
    <h2 className="about-heading">About Us</h2>

    <div className="about-grid">
      <div className="placeholder-img"></div>

      <div className="about-text">
        <p>
          This is our about section, we are so cool and crazy, its like as if we
          are the best thing in the world, just waiting for you to use us, this
          revision shit is kinda trash lowkey, so just use us and make that
          process much easier cuh, This is our about section, we are so cool and
          crazy, its like as if we are the best thing in the world, just waiting
          for you to use us, this revision shit is kinda
        </p>
        <p>
          <strong>
            It will be worth it my doug, you will not regret the decision.
          </strong>
        </p>
      </div>
    </div>

    <h2 className="about-heading">Features</h2>

    <div className="features-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="feature-card">
          <div className="feature-box"></div>
          <p className="feature-text">
            It will be worth it my doug, you will not regret the decision.
          </p>
        </div>
      ))}
    </div>
  </div>
);
export default Features;
