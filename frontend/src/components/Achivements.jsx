import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar, ChevronRight } from 'lucide-react';
import './Achivements.css';
import AchievementsPage from './AchievementsPage';

// --- DATA ---
// TIP: Replace the 'imageUrl' values with your actual Cloudinary URLs
const achievements = [
  {
    id: 1,
    title: "Smart India Hackathon",
    organization: "Govt. of India",
    date: "2023",
    description: "Certificate of Participation for the Internal Hackathon 2023 at Adamas University, where I developed a translator to convert Indian languages into a desired Indian language to enhance cross-language communication.",
    imageUrl: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770300868/portfolio_achievements/ravdfjzgibzcei5jnurr.jpg", // Replace with Cloudinary
    link: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770300868/portfolio_achievements/ravdfjzgibzcei5jnurr.jpg"
  },
  {
    id: 2,
    title: "Code for Change",
    organization: "NSHM Knowledge Campus",
    date: "March 2025",
    description: "Participated in Code for Change 2025, presenting EZStudy AI, a smart study assistant that helps users quickly understand documents by summarizing PPT and Word files and answering questions using AI-powered insights.",
    imageUrl: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770209934/portfolio_achievements/phcwcpk3blaaxvvpsizm.png", // Replace with Cloudinary
    link: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770209934/portfolio_achievements/phcwcpk3blaaxvvpsizm.png"
  },
  {
    id: 3,
    title: "NPTEL Python Cirtificate",
    organization: "IIT Madras",
    date: "Jul-Oct 2025",
    description: "Completed the NPTEL course “The Joy of Computing using Python” from IIT Madras, earning an Elite certificate with 84% and building strong skills in Python programming, problem-solving, and logical thinking.",
    imageUrl: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770306370/portfolio_achievements/w7ay3f3hqghw2ko1iosj.png", // Replace with Cloudinary
    link: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770306370/portfolio_achievements/w7ay3f3hqghw2ko1iosj.png"
  },
  {
    id: 4,
    title: "Symposium Book of Abstracts",
    organization: "JIS University",
    date: "19th June 2025",
    description: "Certificate of Participation for presenting a poster on “Indian Sign Language to Text Converter in Real Time” at a JIS University symposium, showcasing an AI/ML solution to improve accessibility and real-time communication.",
    imageUrl: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770287624/portfolio_achievements/iqrbzmmxrsdzkjczohzv.jpg", // Replace with Cloudinary
    link: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770287624/portfolio_achievements/iqrbzmmxrsdzkjczohzv.jpg"
  },
  {
    id: 5,
    title: "Techsprint Leveraging the power of AI Hackathon",
    organization: "Google",
    date: "13th January 2026",
    description: "Certificate of Participation in the TechSprint AI Hackathon 2026, where I presented AquaWatch, an idea focused on smart water monitoring and management using technology to improve efficiency and sustainability.",
    imageUrl: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770208867/portfolio_achievements/gibgb2q9jpariipoa7iv.jpg", // Replace with Cloudinary
    link: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770208867/portfolio_achievements/gibgb2q9jpariipoa7iv.jpg"
  },
  {
    id: 6,
    title: "Cloud Developing Training Badge",
    organization: "AWS",
    date: "January 2026",
    description: "Completed AWS Academy Cloud Developing training, gaining practical knowledge of cloud computing, AWS services, application deployment, storage, and managing scalable cloud-based solutions.",
    imageUrl: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770311161/portfolio_achievements/lh59pv5jl80wfkoqafye.png", // Replace with Cloudinary
    link: "https://res.cloudinary.com/do8upkuwu/image/upload/v1770311161/portfolio_achievements/lh59pv5jl80wfkoqafye.png"
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Achievements() {
  const [showFullPage, setShowFullPage] = useState(false);

  if (showFullPage) {
    return <AchievementsPage onClose={() => setShowFullPage(false)} />;
  }

  return (
    <section id="achievements" className="achievements-section">
      {/* Background Mesh Effect */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Achievements & Milestones
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="section-subtitle"
        >
          Milestones that mark my journey in technology and innovation.
        </motion.p>
      </div>

      <motion.div 
        className="achievements-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {achievements.map((item) => (
          <motion.div 
            key={item.id} 
            className="achievement-card"
            variants={cardVariants}
            whileHover={{ y: -10 }} // Framer Motion Hover Effect
          >
            {/* Image Section */}
            <div className="card-image-container">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="card-image"
                loading="lazy"
              />
              <div className="card-image-overlay"></div>
            </div>

            {/* Content Section */}
            <div className="card-content">
              <div className="card-badge">
                {item.date}
              </div>
              
              <h3 className="card-title">{item.title}</h3>
              <div className="card-org">
                {item.organization}
              </div>
              
              <p className="card-description">
                {item.description}
              </p>

              <div className="card-footer">
                {item.link && (
                  <a href={item.link} className="credential-btn" target="_blank" rel="noopener noreferrer">
                    Verify <ExternalLink size={16} />
                  </a>
                )}
                {/* Visual Icon for flair */}
                <Award size={24} color="rgba(255,255,255,0.2)" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      <motion.div 
        className="view-more-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <button 
          className="view-more-btn"
          onClick={() => setShowFullPage(true)}
        >
          View All Achievements
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </section>
  );
}