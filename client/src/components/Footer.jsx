const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      {[1, 2, 3].map((num) => (
        <div key={num} className="footer-column">
          <h4 className="footer-title">Site Map {num}</h4>
          <ul className="footer-links">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="footer-link">
                <span className="dot"></span>
                Mapping {i}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Profile / Contact column */}
      <div className="footer-column footer-profile">
        <div className="profile-circle"></div>

        <div className="footer-contact">
          <p>
            <span className="dot"></span> 7974738061
          </p>
          <p>
            <span className="dot"></span> email@example.com
          </p>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      © 2025 Your Company. All rights reserved.
    </div>
  </footer>
);

export default Footer;
