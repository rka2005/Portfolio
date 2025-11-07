import ScrollFloat from "../components/ScrollFloat";
import { motion } from "framer-motion";
import { useState } from "react";
import profilePic from '../assets/rohit.jpg';
import resumePDF from '../assets/Resume_Rohit.pdf';

// 2. Define animation variants for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <motion.div className="about-image" variants={imageVariants}>
          <img src={profilePic} alt="Rohit Kumar Adak" />
        </motion.div>

        <motion.div className="about-content" variants={textVariants}>
          <ScrollFloat>About Me</ScrollFloat>
          
          <p>
            I’m a passionate developer who bridges the gap between functionality and security. As a <strong>Full Stack Developer</strong>, I build seamless, end-to-end web experiences. With a deep interest in technology and innovation, I love transforming ideas into interactive and impactful digital experiences.
          </p>
          <p>
            I’m always eager to explore <strong>AI/ML, IoT, and Cloud Computing,</strong> pushing boundaries to build solutions that are innovative, efficient, and human-centered. My goal is to blend creativity with technology to craft intelligent systems that make everyday life simpler and smarter.
          </p>

          <a 
            href={resumePDF} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="modern-btn">View Resume</button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}