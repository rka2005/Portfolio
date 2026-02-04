import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, X } from 'lucide-react';
import './AchievementsPage.css';

// Remote achievements will be fetched from backend
const allAchievements = [];

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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchAchievements() {
      try {
        const res = await fetch('http://localhost:5000/api/achievements');
        const json = await res.json();
        if (!cancelled && json && json.success) {
          setItems(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch achievements', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAchievements();
    return () => { cancelled = true; };
  }, []);

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
            {loading && <div style={{ color: '#fff' }}>Loading...</div>}
            {!loading && items.length === 0 && <div style={{ color: '#fff' }}>No achievements found.</div>}
            {items.map((item) => (
              <motion.div 
                key={item._id || item.id} 
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
