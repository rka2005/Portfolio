import { useState, useEffect, useRef } from 'react';
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [activeSection, setActiveSection] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null); 

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0% -50% 0%',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const activeLink = navRef.current.querySelector(
      `[data-section="${activeSection}"]`
    );

    if (activeLink) {
      const parentLi = activeLink.parentElement;
      setUnderlineStyle({
        left: parentLi.offsetLeft,
        width: parentLi.offsetWidth,
      });
    }
  }, [activeSection]);

  return (
    <section id="home">
      <nav className="navbar">
        <div className="logo">
          RK<span> 05</span>
        </div>
        
        <ul className="nav-links" ref={navRef}>
          <li><a href="#home" data-section="home">Home</a></li>
          <li><a href="#about" data-section="about">About</a></li>
          <li><a href="#skills" data-section="skills">Skills</a></li>
          <li><a href="#projects" data-section="projects">Projects</a></li>
          <li><a href="#contact" data-section="contact">Contact</a></li>
          
          {/* This is the new animated underline element */}
          <div className="nav-underline" style={underlineStyle} />
        </ul>
      </nav>

      {/* ... rest of your HeroSection content ... */}
      <div className="hero-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="main-title">Hi, I’m <span>Rohit Kumar Adak</span></h1>
          <div className="subtitle">
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "Passionate Software Developer",
                  "Tech Enthusiast",
                  "Innovator"
                ],
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 30
              }}
            />
          </div>
          <p className="tagline">Building seamless digital experiences with precision & creativity.</p>
          <a href="#projects">
            <button className="modern-btn">View My Work</button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}