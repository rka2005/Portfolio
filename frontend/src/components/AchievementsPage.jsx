import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, X } from 'lucide-react';
import './AchievementsPage.css';

// Extended achievements data
const allAchievements = [
  {
    id: 1,
    title: "Smart India Hackathon",
    organization: "Govt. of India",
    date: "WINNER 2024",
    description: "Secured 1st place nationwide for developing an AI-driven solution for sustainable water management using satellite data.",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    date: "CERTIFIED 2023",
    description: "Validated expertise in developing, deploying, and debugging cloud-based applications using AWS architecture.",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Google Code Jam",
    organization: "Google",
    date: "TOP 50 2023",
    description: "Competed against 10,000+ developers globally, solving complex algorithmic challenges under strict time limits.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1588&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 4,
    title: "Open Source Contributor",
    organization: "Mozilla",
    date: "ONGOING",
    description: "Active contributor to core repositories, improving rendering engine performance and fixing critical UI bugs.",
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1752&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 5,
    title: "Full Stack Nanodegree",
    organization: "Udacity",
    date: "GRADUATED 2022",
    description: "Comprehensive program covering SQL, API development, Identity Access Management, and Server Deployment.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 6,
    title: "Hackathon Winner",
    organization: "TechFest",
    date: "WINNER 2023",
    description: "Built an innovative solution that impressed judges with its scalability and real-world impact.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 7,
    title: "React Advanced Certification",
    organization: "Meta",
    date: "CERTIFIED 2023",
    description: "Advanced certification in React development, covering advanced hooks, performance optimization, and architecture patterns.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 8,
    title: "Blockchain Developer",
    organization: "IBM",
    date: "CERTIFIED 2023",
    description: "Specialized in building decentralized applications and smart contracts on Ethereum and Hyperledger platforms.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1632&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 9,
    title: "AI/ML Specialization",
    organization: "Stanford Online",
    date: "COMPLETED 2022",
    description: "Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, and deep learning.",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1632&auto=format&fit=crop",
    link: "#"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function AchievementsPage({ onClose }) {
  return (
    <div className="achievements-page-overlay">
      <div className="achievements-page-container">
        {/* Close Button */}
        <motion.button 
          className="close-button"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <X size={28} />
        </motion.button>

        {/* Background Effect */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div className="achievements-page-content">
          {/* Header */}
          <motion.div 
            className="page-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="page-title">All Achievements</h1>
            <p className="page-subtitle">
              A comprehensive collection of my certifications, awards, and milestones
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div 
            className="achievements-page-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {allAchievements.map((item) => (
              <motion.div 
                key={item.id} 
                className="achievement-page-card"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <div className="page-card-image-container">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="page-card-image"
                    loading="lazy"
                  />
                  <div className="page-card-image-overlay"></div>
                </div>

                <div className="page-card-content">
                  <div className="page-card-badge">
                    {item.date}
                  </div>
                  
                  <h3 className="page-card-title">{item.title}</h3>
                  <div className="page-card-org">
                    {item.organization}
                  </div>
                  
                  <p className="page-card-description">
                    {item.description}
                  </p>

                  <div className="page-card-footer">
                    {item.link && (
                      <a href={item.link} className="page-credential-btn" target="_blank" rel="noopener noreferrer">
                        Verify <ExternalLink size={16} />
                      </a>
                    )}
                    <Award size={24} color="rgba(255,255,255,0.2)" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
