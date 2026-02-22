import { motion } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import { FiSend } from "react-icons/fi";
import './Contact.css';
import { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Contact() {

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, "contacts"), {
        ...data,
        createdAt: serverTimestamp(),
      });

      // 2. Send email via Vercel serverless function
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!result.success) {
        console.warn("Email sending failed, but message was saved.");
      }

      alert("Message sent successfully 🚀");
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="section">
      <motion.div
        className="contact-container"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
      >
        <ScrollFloat>Get In Touch</ScrollFloat>
        
        <p className="contact-subtitle">
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>

        <div className="contact-grid">
          
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder=" " 
                required 
              />
              <label htmlFor="name">Your Name</label>
            </div>

            <div className="form-group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder=" "
                required 
              />
              <label htmlFor="email">Your Email</label>
            </div>

            <div className="form-group">
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder=" "
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            <button 
              type="submit" 
              className="modern-btn" 
              disabled={loading}
            >
              <span className="btn-text-default">
                {loading ? "Sending..." : "Send Message"}
              </span>

              <span className="btn-text-hover">
                <span>{loading ? "Please Wait" : "Submit Now"}</span>
                {!loading && <FiSend />}
              </span>
            </button>
          </form>

        </div>
      </motion.div>
    </section>
  );
}