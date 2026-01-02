// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/contact.css";

// const ContactPage = () => {
//   return (
//     <div className="app-container">
//       <Navbar />

//       <section className="contact-page">
//         <div className="contact-header">
//           <h1>Contact Us</h1>
//           <p>
//             Have questions, feedback, or need support? We’d love to hear from
//             you.
//           </p>
//         </div>

//         <div className="contact-content">
//           {/* Left: form */}
//           <div className="contact-form">
//             <h3>Send a Message</h3>

//             <input type="text" placeholder="Your Name" />
//             <input type="email" placeholder="Your Email" />
//             <textarea rows="4" placeholder="Your Message" />

//             <button className="contact-btn">Send Message</button>
//           </div>

//           {/* Right: info */}
//           <div className="contact-info">
//             <h3>Get in Touch</h3>

//             <p>
//               Whether you’re facing an issue, have a feature request, or just
//               want to say hello — feel free to reach out.
//             </p>

//             <div className="contact-details">
//               <p>
//                 <strong>Email:</strong> support@yourwebsite.com
//               </p>
//               <p>
//                 <strong>Phone:</strong> +91 98765 43210
//               </p>
//               <p>
//                 <strong>Address:</strong> India
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react"; // Optional: Use icons for extra flair
import "../styles/contact.css";

const ContactPage = () => {
  return (
    <div className="app-container">
      <Navbar />

      <section className="contact-page">
        <div className="contact-header">
          <h1 className="gradient-text">Get in Touch</h1>
          <p>
            Have questions, feedback, or need support? Our team is here to help
            you master your learning journey.
          </p>
        </div>

        <div className="contact-content">
          {/* Left: form */}
          <div className="contact-form-container box">
            <h3>Send a Message</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="contact-input"
              />
              <textarea
                rows="5"
                placeholder="How can we help?"
                className="contact-textarea"
              />

              <button className="contact-btn">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right: info */}
          <div className="contact-info">
            <div className="info-intro">
              <h3>Support Channels</h3>
              <p>
                Whether you’re facing an issue, have a feature request, or just
                want to say hello — feel free to reach out.
              </p>
            </div>

            <div className="contact-cards">
              <div className="info-card">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>support@learncurve.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Office</h4>
                  <p>Gwalior, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
