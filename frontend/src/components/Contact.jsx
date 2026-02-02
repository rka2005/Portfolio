import { motion } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import { FiSend } from "react-icons/fi";
import './Contact.css';
import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

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
  const formId = import.meta.env.FORMSPREE_ID;
  const [state, handleSubmit] = useForm(formId);

  useEffect(() => {
    if (state.succeeded) {
      alert("Thank you! Your message has been sent successfully.");
      formRef.current?.reset();
    }
  }, [state.succeeded]);

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

            <button type="submit" className="modern-btn">
              <span className="btn-text-default">Send Message</span>
              <span className="btn-text-hover">
                <span>Submit Now</span>
                <FiSend />
              </span>
            </button>
          </form>

        </div>
      </motion.div>
    </section>
  );
}