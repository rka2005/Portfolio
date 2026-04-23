import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScrollFloat from "../components/ScrollFloat";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import project1Image from "../assets/projects/isl.jpeg";
import project2Image from "../assets/projects/nura.jpeg";
import project3Image from "../assets/projects/aquawatch.jpg";
import project4Image from "../assets/projects/quickshare.jpeg";
import project6Image from "../assets/projects/ezstudy.jpeg";
import project7Image from "../assets/projects/heart3.png";
import project8Image from "../assets/projects/matchmedia.jpeg";
import project9Image from "../assets/projects/aria.jpeg";
import project10Image from "../assets/projects/nexus.png";

const projectsData = [
  {
    title: "ISL",
    description: "ISL Translator is a real-time system application that translates Indian Sign Language gestures into text, enabling smoother communication between the hearing and hearing-impaired communities.",
    imageUrl: project1Image, 
    tech: ["Python", "MediaPipe", "TensorFlow", "CNN"],
    github: "https://github.com/rka2005/ISL_backend",
    live: null,
  },
  {
    title: "Neura AI",
    description: "NURA is a personalized AI assistant designed to understand voice commands, engage in natural conversations, and perform intelligent tasks in real time. It integrates speech recognitionand task execution to provide a smooth, interactive, and intelligent user experience.",
    imageUrl: project2Image,
    tech: ["Python", "Fast API", "HTML", "CSS", "Java Script"],
    github: "https://github.com/rka2005/Nura-AI",
    live: null,
  },
  {
    title: "AquaWatch",
    description: "AquaWatch is a mobile app that monitors India’s groundwater levels in real time and provides a 5-year predictive forecast. It offers actionable insights and sustainable solutions to help communities, farmers, and policymakers manage water resources effectively.",
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
      title: "Aria-Studio",
      description: "Aria Studio is a Cloud Music streaming web application that allows to stream and play audio files directly from Google Drive folders. It features continuous playback, playlist management, and a modern UI for a seamless listening experience without downloading files.",
      imageUrl: project9Image,
      tech: ["React", "Node.JS", "Express.JS", "Google Drive API", "OAuth 2.0", "Tailwind CSS"],
      github: "https://github.com/rka2005/Drive-Music",
      live: "https://ariastu.vercel.app/",
  },
];

export default function Projects() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = window.innerWidth <= 768;
  
  // Show only first 6 projects
  const visibleProjects = projectsData.slice(0, 5);
  
  const x = isMobile
    ? 0 // no horizontal movement
    : useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleViewMore = () => {
    // Navigate to the all projects page
    navigate('/projects');
  };

  return (
    <section id="projects" className="section">
      <ScrollFloat>My Projects</ScrollFloat>

      <div ref={scrollContainerRef} className="horizontal-scroll-container">
        <div className="sticky-wrapper">
          <motion.div
            className="horizontal-track"
            style={isMobile ? {} : { x }}
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                isFlipped={flippedIndex === index}
                onToggle={() =>
                  setFlippedIndex(flippedIndex === index ? null : index)
                }
              />
            ))}
            
            {/* View More Card */}
            <div className="project-card-horizontal">
              <div className="project-card-inner view-more-card">
                <div className="view-more-content">
                  <div className="view-more-icon">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                  </div>
                  <h3>View More Projects</h3>
                  <p>Discover more amazing projects</p>
                  <button onClick={handleViewMore} className="view-more-btn">
                    <span>Explore All</span>
                    <FiExternalLink />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isFlipped, onToggle }) {
  const flipVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  return (
    <div className="project-card-horizontal">
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