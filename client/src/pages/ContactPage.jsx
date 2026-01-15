import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { contactUser } from "../api/contact";
// Added Loader2 to imports so the loading state doesn't crash the app
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"; 
import "../styles/contact.css";

const ContactPage = () => {
  // 1. Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });

  const { name, email, message } = formData;

  // 2. Handle Input Change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMsg.text) setStatusMsg({ text: "", type: "" }); 
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true);

    try {
      const res = await contactUser(formData);
      if (res.data.success) {
        setStatusMsg({ text: "Message sent! We'll get back to you soon. 🎉", type: "success" });
        setFormData({ name: "", email: "", message: "" }); // Clear form
      }
    } catch (err) {
      setStatusMsg({ 
        text: err.response?.data?.error || "Failed to send message. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

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
            
            {/* Status Feedback UI */}
            {statusMsg.text && (
              <div className={`status-alert ${statusMsg.type}`}>
                {statusMsg.text}
              </div>
            )}

            {/* FIXED: Changed div to form and attached onSubmit */}
            <form className="form-group" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Your Name"
                className="contact-input"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Your Email"
                className="contact-input"
                required
              />
              <textarea
                name="message"
                value={message}
                onChange={onChange}
                rows="5"
                placeholder="How can we help?"
                className="contact-textarea"
                required
              />

              <button className="contact-btn" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span>Sending...</span>
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
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