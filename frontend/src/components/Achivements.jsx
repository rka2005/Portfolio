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
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop", // Replace with Cloudinary
    link: "#"
  },
  {
    id: 2,
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    date: "CERTIFIED 2023",
    description: "Validated expertise in developing, deploying, and debugging cloud-based applications using AWS architecture.",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1740&auto=format&fit=crop", // Replace with Cloudinary
    link: "#"
  },
  {
    id: 3,
    title: "Google Code Jam",
    organization: "Google",
    date: "TOP 50 2023",
    description: "Competed against 10,000+ developers globally, solving complex algorithmic challenges under strict time limits.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1588&auto=format&fit=crop", // Replace with Cloudinary
    link: "#"
  },
  {
    id: 4,
    title: "Open Source Contributor",
    organization: "Mozilla",
    date: "ONGOING",
    description: "Active contributor to core repositories, improving rendering engine performance and fixing critical UI bugs.",
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1752&auto=format&fit=crop", // Replace with Cloudinary
    link: "#"
  },
  {
    id: 5,
    title: "Full Stack Nanodegree",
    organization: "Udacity",
    date: "GRADUATED 2022",
    description: "Comprehensive program covering SQL, API development, Identity Access Management, and Server Deployment.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop", // Replace with Cloudinary
    link: "#"
  },
  {
    id: 6,
    title: "Full Stack Nanodegree",
    organization: "Udacity",
    date: "GRADUATED 2022",
    description: "Comprehensive program covering SQL, API development, Identity Access Management, and Server Deployment.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop", // Replace with Cloudinary
    link: "#"
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