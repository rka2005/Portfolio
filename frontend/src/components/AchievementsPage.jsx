import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, X, Scan, ShieldCheck } from 'lucide-react';
import AchievementLoader from './AchievementLoader';
import './AchievementsPage.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

// --- HOLOGRAPHIC ANIMATION VARIANTS ---
const hologramVariants = {
  hidden: { 
    opacity: 0,
    scaleY: 0.01,
    scaleX: 0,
    filter: "brightness(2) blur(10px)",
  },
  visible: { 
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    filter: "brightness(1) blur(0px)",
    transition: { 
      duration: 0.4,
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0,
    scaleY: 0.01,
    scaleX: 1.5, // Stretch out like a CRT turning off
    filter: "brightness(5) blur(5px)",
    transition: { duration: 0.3 }
  }
};

export default function AchievementsPage({ onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Lock Body Scroll when Modal is Open
  useEffect(() => {
    if (activeCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [activeCertificate]);

  // --- MONGODB FETCH LOGIC ---
  useEffect(() => {
    let cancelled = false;

    async function fetchAchievements() {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE;
        let base;
        if (typeof API_BASE === 'string') {
          base = API_BASE === '' ? '' : API_BASE;
        } else {
          base = 'http://localhost:5000';
        }
        
        const url = base ? `${base}/api/achievements` : `/api/achievements`;
        const res = await fetch(url);
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
        
        {/* Main Close Button */}
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

        {/* Ambient Background */}
        <div className="ambient-glow"></div>

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

          {/* Grid */}
          {loading ? (
            <AchievementLoader />
          ) : (
            <motion.div 
              className="achievements-page-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.length === 0 && <div style={{ color: '#fff', textAlign: 'center', width: '100%' }}>No achievements found.</div>}
              
              {items.map((item) => (
                <motion.div 
                  key={item._id || item.id} 
                  className="achievement-page-card"
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0, 243, 255, 0.2)" }}
                >
                  <div className="page-card-image-container">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="page-card-image"
                      loading="lazy"
                    />
                    <div className="page-card-image-overlay"></div>
                    
                    {/* Hover Scan Icon Trigger */}
                    <div className="scan-icon-overlay" onClick={() => setActiveCertificate(item)}>
                      <Scan size={32} />
                    </div>
                  </div>

                  <div className="page-card-content">
                    <div 
                      className="page-card-badge" 
                      onClick={() => setActiveCertificate(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <ShieldCheck size={12} style={{marginRight:4}}/> Verify
                    </div>
                    
                    <h3 className="page-card-title">{item.title}</h3>
                    <div className="page-card-org">{item.organization || "Personal Achievement"}</div>
                    
                    <p className="page-card-description">{item.description}</p>

                    <div className="page-card-footer">
                      {item.link && (
                        <a href={item.link} className="page-credential-btn" target="_blank" rel="noopener noreferrer">
                          Verify <ExternalLink size={16} />
                        </a>
                      )}
                      <Award size={24} color="rgba(0, 243, 255, 0.2)" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* --- CREATIVE HOLOGRAPHIC VIEWER --- */}
      {activeCertificate && createPortal(
        <AnimatePresence>
          <motion.div
            className="certificate-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertificate(null)}
          >
            {/* Hologram Container */}
            <motion.div
              className="certificate-holo-container"
              variants={hologramVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scanlines Effect */}
              <div className="holo-scanlines"></div>
              
              {/* Corner Accents */}
              <div className="holo-corner top-left"></div>
              <div className="holo-corner top-right"></div>
              <div className="holo-corner bottom-left"></div>
              <div className="holo-corner bottom-right"></div>

              {/* Header */}
              <div className="holo-header">
                <div className="holo-status">
                  <div className="holo-dot"></div>
                  SECURE_VIEW :: {activeCertificate.title.toUpperCase()}
                </div>
                <button
                  className="holo-close-btn"
                  onClick={() => setActiveCertificate(null)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image */}
              <div className="holo-body">
                <img
                  src={activeCertificate.imageUrl}
                  alt={activeCertificate.title}
                  className="certificate-image"
                />
              </div>

              {/* Footer */}
              <div className="holo-footer">
                <p>CONFIDENTIALITY LEVEL: PUBLIC // VERIFIED BY RK05 SYSTEMS</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}