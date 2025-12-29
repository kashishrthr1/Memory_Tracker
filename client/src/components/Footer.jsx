// const Footer = () => (
//   <footer className="footer">
//     <div className="footer-grid">
//       {[1, 2, 3].map((num) => (
//         <div key={num} className="footer-column">
//           <h4 className="footer-title">Site Map {num}</h4>
//           <ul className="footer-links">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <li key={i} className="footer-link">
//                 <span className="dot"></span>
//                 Mapping {i}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       {/* Profile / Contact column */}
//       <div className="footer-column footer-profile">
//         <div className="profile-circle"></div>

//         <div className="footer-contact">
//           <p>
//             <span className="dot"></span> 7974738061
//           </p>
//           <p>
//             <span className="dot"></span> email@example.com
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className="footer-bottom">
//       © 2025 Your Company. All rights reserved.
//     </div>
//   </footer>
// );

// export default Footer;

const Footer = () => {
  const sections = [
    {
      title: "Product",
      links: ["Features", "Dashboard", "Assessments", "Pricing", "Updates"],
    },
    {
      title: "Company",
      links: ["About Us", "Our Story", "Careers", "Blog", "Contact"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Privacy", "Terms", "Support"],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        {sections.map((section, idx) => (
          <div key={idx} className="footer-column">
            <h4 className="footer-title">{section.title}</h4>
            <ul className="footer-links">
              {section.links.map((link, i) => (
                <li key={i} className="footer-link">
                  <span className="dot"></span>
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Profile / Brand column */}
        <div className="footer-column footer-profile">
          <div className="profile-circle">
            <span className="brand-initial">L</span>
          </div>

          <div className="footer-contact">
            <p>
              <span className="dot"></span> +91 7974738061
            </p>
            <p>
              <span className="dot"></span> hello@learncurve.com
            </p>
            <div className="social-placeholders">
              <div className="social-dot"></div>
              <div className="social-dot"></div>
              <div className="social-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 LearnCurve AI. Built for the future of education.</p>
      </div>
    </footer>
  );
};

export default Footer;
