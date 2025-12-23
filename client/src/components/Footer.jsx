const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      {[1, 2, 3].map((num) => (
        <div key={num} className="footer-column">
          <h4>Site Map {num}</h4>
          <ul className="footer-links">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <span className="dot"></span> Mapping 1
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="footer-column">
        <div className="profile-circle"></div>
        <p>
          <span className="dot"></span> 7974738061
        </p>
        <p>
          <span className="dot"></span> email
        </p>
      </div>
    </div>
  </footer>
);
export default Footer;
