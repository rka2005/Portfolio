import { useState, useEffect, useRef } from 'react';
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerButton from './HamburgerButton';

export default function HeroSection() {
  const [activeSection, setActiveSection] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <section id="home">
      <nav className="navbar">
        <div className="logo">
          RK<span> 05</span>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav" ref={navRef}>
          <li><a href="#home" data-section="home">Home</a></li>
          <li><a href="#about" data-section="about">About</a></li>
          <li><a href="#skills" data-section="skills">Skills</a></li>
          <li><a href="#projects" data-section="projects">Projects</a></li>
          <li><a href="#contact" data-section="contact">Contact</a></li>
          <div className="nav-underline" style={underlineStyle} />
        </ul>

        {/* Right side controls */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>

          {/* Mobile Hamburger (Visible only on Mobile via CSS) */}
          <div className="mobile-menu-btn">
            <HamburgerButton isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-nav-overlay"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-nav-links">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setIsMobileMenuOpen(true)}
                      className={activeSection === item ? 'active' : ''}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
                  "Software Developer",
                  "Tech Enthusiast",
                  "Innovator"
                ],
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 30,
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