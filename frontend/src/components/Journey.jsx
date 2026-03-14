import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code, Star } from 'lucide-react';
import './Journey.css';

const journeyData = [
  {
    id: 1,
    type: "work",
    year: "2024 - Present",
    role: "Full Stack Developer",
    company: "Tech Innovations Inc.",
    description: "Architecting and developing scalable web applications using React, Node.js, and MongoDB. Leading a team of 3 junior developers.",
    icon: <Briefcase size={18} />
  },
  {
    id: 2,
    type: "work",
    year: "2023 - Present",
    role: "Frontend Developer",
    company: "Creative Digital Studio",
    description: "Built highly interactive user interfaces, optimized web performance resulting in a 40% speed increase, and collaborated with UX designers.",
    icon: <Code size={18} />
  },
  {
    id: 3,
    type: "work",
    year: "2023 - Present",
    role: "Backend Developer",
    company: "Innovatech Solutions",
    description: "Designed and implemented RESTful APIs, integrated third-party services, and improved database efficiency by 30% through query optimization.",
    icon: <Code size={18} />
  },
  {
    id: 4,
    type: "education",
    year: "2023 - Present",
    role: "B.Tech in Computer Science",
    company: "University of Technology",
    description: "Focusing on Data Structures, Algorithms, and Software Engineering. Active member of the coding club and hackathon participant.",
    icon: <GraduationCap size={18} />
  },
  {
    id: 5,
    type: "education",
    year: "2022 - 2023",
    role: "Higher Secondary Education",
    company: "City High School",
    description: "Completed with distinction in Science stream (Physics, Chemistry, Mathematics). Developed a passion for programming during this time.",
    icon: <Star size={18} />
  }
];

function JourneyItem({ item, index, isMobile }) {
  const isLeft = index % 2 === 0;
  
  const color = item.type === "education" ? "#00E5FF" : "#00FF9D";
  const glowColor = item.type === "education" ? "rgba(0, 229, 255, 0.4)" : "rgba(0, 255, 157, 0.4)";

  // Desktop paths (Start Center 50, curves outwards into opposite space)
  const dPathDesktop = isLeft
    ? "M 50,0 C 100,0 100,100 50,100" 
    : "M 50,0 C 0,0 0,100 50,100";    

  // Mobile paths (Start Left 15%, weaves gently on the left side)
  const dPathMobile = isLeft
    ? "M 15,0 C 25,0 25,100 15,100"   
    : "M 15,0 C 5,0 5,100 15,100";    

  const dPath = isMobile ? dPathMobile : dPathDesktop;
  
  // Mathematically calculated apexes for perfect dot placement
  const dotX = isMobile
    ? (isLeft ? '22.5%' : '7.5%')
    : (isLeft ? '87.5%' : '12.5%');

  // Animation values adapted for mobile vs desktop
  const animX = isMobile ? 0 : (isLeft ? -40 : 40);
  const animY = isMobile ? 30 : 20;

  return (
    <div className={`timeline-row ${isLeft ? "left" : "right"}`}>
      
      <div className="svg-container">
        <svg preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={`snake-grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={isLeft ? "#00E5FF" : "#00FF9D"} stopOpacity="0.2" />
            </linearGradient>
            <filter id={`glow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={isMobile ? "2" : "3"} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Glow Path */}
          <motion.path
            d={dPath}
            stroke={glowColor}
            fill="none"
            strokeWidth={isMobile ? "4" : "8"}
            vectorEffect="non-scaling-stroke"
            filter={`url(#glow-${index})`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* Main Solid Path */}
          <motion.path
            d={dPath}
            stroke={`url(#snake-grad-${index})`}
            fill="none"
            strokeWidth={isMobile ? "2" : "3"}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Animated Energy Flow Particle */}
          <motion.path
            d={dPath}
            stroke="#ffffff"
            fill="none"
            strokeWidth={isMobile ? "2" : "3"}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeDasharray="1 100"
            initial={{ strokeDashoffset: 100, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ strokeDashoffset: [100, 0] }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <motion.div
        className="timeline-apex-dot"
        style={{ left: dotX, borderColor: color, boxShadow: `0 0 ${isMobile ? '10px' : '20px'} ${glowColor}` }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 }}
      >
        <motion.div 
          className="dot-pulse" 
          style={{ backgroundColor: color }}
          animate={{
            boxShadow: [
              `0 0 0 0px ${color}60`,
              `0 0 0 ${isMobile ? '12px' : '20px'} ${color}00`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="dot-icon">{item.icon}</span>
      </motion.div>

      <motion.div
        className="timeline-card-wrapper"
        initial={{ opacity: 0, x: animX, y: animY }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0.3 }}
        whileHover={{ scale: isMobile ? 1 : 1.02, y: isMobile ? 0 : -5 }}
      >
        <div 
          className="timeline-content" 
          style={{ 
            borderTop: `1px solid ${color}50`, 
            borderLeft: (isLeft || isMobile) ? `1px solid ${color}50` : '1px solid rgba(255,255,255,0.05)',
            borderRight: (!isLeft && !isMobile) ? `1px solid ${color}50` : '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="journey-date" style={{ color: color, background: `${color}15`, border: `1px solid ${color}30` }}>
            {item.year}
          </div>
          <h3 className="journey-role">{item.role}</h3>
          <h4 className="journey-company">
            {item.company}
          </h4>
          <p className="journey-desc">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a slightly wider threshold for mobile to catch large tablets in portrait
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="journey" className="journey-section">
      <div className="journey-bg-glow"></div>

      <div className="journey-header">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="journey-title"
        >
          My Journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="journey-subtitle"
        >
          The path I've taken in education and professional experience.
        </motion.p>
      </div>

      <div className="timeline-container">
        {journeyData.map((item, index) => (
          <JourneyItem key={item.id} item={item} index={index} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}