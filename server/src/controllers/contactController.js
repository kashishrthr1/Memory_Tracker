const Message = require('../models/Message');

exports.submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ 
      success: true, 
      message: "Message sent successfully! We will get back to you soon." 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};