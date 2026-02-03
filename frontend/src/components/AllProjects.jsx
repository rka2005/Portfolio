import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SiGithub } from "react-icons/si";
import { FiExternalLink, FiArrowLeft } from "react-icons/fi";
import ScrollFloat from "./ScrollFloat";
import Particles from './Background';
import project1Image from "../assets/projects/isl.jpeg";
import project2Image from "../assets/projects/nura.jpeg";
import project3Image from "../assets/projects/aquawatch.jpg";
import project4Image from "../assets/projects/quickshare.jpeg";
import project5Image from "../assets/projects/crash.jpeg";
import project6Image from "../assets/projects/ezstudy.jpeg";
import project7Image from "../assets/projects/heart3.png";
import project8Image from "../assets/projects/matchmedia.jpeg";
import './AllProjects.css';

const projectsData = [
  {
    title: "Indian Sign Language",
    description: "ISL Translator is a real-time system application that translates Indian Sign Language gestures into text, enabling smoother communication between the hearing and hearing-impaired communities.",
    imageUrl: project1Image, 
    tech: ["Python", "MediaPipe", "TensorFlow", "CNN"],
    github: "https://github.com/rka2005/ISL_backend",
    live: null,
  },
  {
    title: "Neura AI",
    description: "NURA is a personalized AI assistant designed to understand voice commands, engage in natural conversations, and perform intelligent tasks in real time. It integrates speech recognition and task execution to provide a smooth, interactive, and intelligent user experience.",
    imageUrl: project2Image,
    tech: ["Python", "Fast API", "HTML", "CSS", "Java Script"],
    github: "https://github.com/rka2005/Nura-AI",
    live: null,
  },
  {
    title: "AquaWatch",
    description: "AquaWatch is a mobile app that monitors India's groundwater levels in real time and provides a 5-year predictive forecast. It offers actionable insights and sustainable solutions to help communities, farmers, and policymakers manage water resources effectively.",
    imageUrl: project3Image, 
    tech: ["React", "Type Script", "Python", "Fast API", "Firebase"],
    github: "https://github.com/rka2005/AquaWatch_1.0",
    live: "https://aquawatch-v1.vercel.app/",
  },
  {
    title: "Quick Share",
    description: "Quick Share is a fast and secure web application that allows users to upload, preview, and share files or text instantly. It supports multiple file formats, including PDFs with live previews, and provides a seamless, real-time sharing experience across all devices.",
    imageUrl: project4Image, 
    tech: ["HTML", "Java Script", "MongoDB", "Python", "Fast API", "vercel"],
    github: "https://github.com/rka2005/Quick-Share",
    live: "https://qshareio.vercel.app/",
  },
  {
    title: "Crash-detector",
    description: "It is a smart system for bikes or scooters that detects crashes in real time and sends the rider's location to nearby hospitals and police, ensuring faster emergency response and improved road safety.",
    imageUrl: project5Image, 
    tech: ["Python", "Arduino UNO", "Google map"],
    github: "https://github.com/rka2005/Crash-Detection-Softaware",
    live: null,
  },
  {
    title: "EZ-Study",
    description: "EZStudy AI is a smart study assistant that helps users quickly grasp their documents. It lets users upload PPTs and Word files to summarizes the content and answers questions based on the document using AI-powered insights.",
    imageUrl: project6Image, 
    tech: ["React", "Java Script", "Vercel", "OpenAI"],
    github: "https://github.com/rka2005/EzStudyAI",
    live: "https://ezstudyai.vercel.app/",
  },
  {
    title: "Heart Disease Prediction",
    description: "This project predicts the risk of heart disease using machine learning and deep learning by analyzing key health factors. The model helps identify potential risks early, supporting better medical decisions.",
    imageUrl: project7Image,
    tech: ["React", "Java Script", "Vercel", "OpenAI"],
    github: "https://github.com/rka2005/Heart_Disease_Prediction",
    live: null,
  },
  {
    title: "Match Media",
    description: "Match Media enables real-time synchronized media playback across multiple devices with room-based collaboration and instant control sharing.",
    imageUrl: project8Image,
    tech: ["React", "Java Script", "Python", "Fast API", "Web Sockets"],
    github: "https://github.com/rka2005/Sync-Song",
    live: "https://matchmedia.vercel.app/",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AllProjects() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <div className="all-projects-page">
      <div style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: -1 
      }}>
        <Particles/>
      </div>

      <div className="all-projects-header">
        <Link to="/" className="back-home-btn">
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="all-projects-container">
        <ScrollFloat>All Projects</ScrollFloat>
        <p className="all-projects-subtitle">
          Explore my complete collection of projects showcasing various technologies and solutions
        </p>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="project-grid-card"
            >
              <ProjectCard
                project={project}
                isFlipped={flippedIndex === index}
                onToggle={() =>
                  setFlippedIndex(flippedIndex === index ? null : index)
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, isFlipped, onToggle }) {
  const flipVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  return (
    <div className="project-card-wrapper">
      <div className="project-card-inner">
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="card-face card-front"
            >
              <div className="project-card-image">
                <img src={project.imageUrl} alt={project.title} />
              </div>
              <div className="project-card-content">
                <h3>{project.title}</h3>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <SiGithub />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiExternalLink />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                <div className="details-button-container">
                  <button onClick={onToggle} className="card-toggle-btn">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="card-face card-back"
            >
              <div className="project-card-content back-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech-stack">
                  {project.tech.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={onToggle} className="card-toggle-btn back-btn">
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
