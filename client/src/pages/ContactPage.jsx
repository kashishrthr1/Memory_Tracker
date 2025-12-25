import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

const ContactPage = () => {
  return (
    <div className="app-container">
      <Navbar />

      <section className="contact-page">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or need support? We’d love to hear from
            you.
          </p>
        </div>

        <div className="contact-content">
          {/* Left: form */}
          <div className="contact-form">
            <h3>Send a Message</h3>

            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea rows="4" placeholder="Your Message" />

            <button className="contact-btn">Send Message</button>
          </div>

          {/* Right: info */}
          <div className="contact-info">
            <h3>Get in Touch</h3>

            <p>
              Whether you’re facing an issue, have a feature request, or just
              want to say hello — feel free to reach out.
            </p>

            <div className="contact-details">
              <p>
                <strong>Email:</strong> support@yourwebsite.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Address:</strong> India
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
