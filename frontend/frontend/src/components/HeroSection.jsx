import { useState, useEffect, useRef } from 'react';
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerButton from './HamburgerButton';

export default function HeroSection() {
  const [activeSection, setActiveSection] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // --- 1. Intersection Observer (Tracks scrolling) ---
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
      { rootMargin: '-50% 0% -50% 0%', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // --- 2. Underline Logic ---
  useEffect(() => {
    if (!navRef.current) return;
    const timeoutId = setTimeout(() => {
      const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeLink) {
        const parentLi = activeLink.parentElement;
        setUnderlineStyle({
          left: parentLi.offsetLeft,
          width: parentLi.offsetWidth,
        });
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // --- 3. ROBUST SCROLL HANDLER (FIXED) ---
  const handleScroll = (e, targetId) => {
    e.preventDefault();

    // Function to perform the actual scroll
    const performScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        // Calculate offset to prevent Navbar from covering the section title
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (isMobileMenuOpen) {
      // If mobile menu is open, close it first
      setIsMobileMenuOpen(false);
      // Wait a tiny bit for the menu close animation to start before scrolling
      setTimeout(performScroll, 300);
    } else {
      // If desktop, scroll immediately
      performScroll();
    }
  };

  return (
    <section id="home">
      <nav className="navbar">
        <div className="logo">
          RK<span> 05</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav" ref={navRef}>
          {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                data-section={item}
                onClick={(e) => handleScroll(e, item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
          <div className="nav-underline" style={underlineStyle} />
        </ul>

        {/* Right side controls */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Mobile Hamburger */}
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
                      className={activeSection === item ? 'active' : ''}
                      onClick={(e) => handleScroll(e, item)}
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

      {/* Hero Content */}
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
                deleteSpeed: 30
              }}
            />
          </div>
          <p className="tagline">Building seamless digital experiences with precision & creativity.</p>

          {/* CTA Button using the same scroll logic */}
          <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>
            <button className="modern-btn">View My Work</button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}