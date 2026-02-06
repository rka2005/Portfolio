import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Analytics.css';

const stats = [
  {
    id: 1,
    label: 'Projects',
    value: 8,
    suffix: '+',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'GitHub Repos',
    value: 20,
    suffix: '+',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="stat-icon">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'Badges & Certificates',
    value: 50,
    suffix: '+',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Contributions',
    value: 250,
    suffix: '+',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

// Animated counter hook
function useCounter(target, isInView, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a natural deceleration feel
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return count;
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCounter(stat.value, isInView);

  return (
    <motion.div
      ref={ref}
      className="analytics-card"
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      whileHover={{ y: -8, scale: 1.03 }}
    >
      {/* Glow effect behind card */}
      <div className="card-glow" />

      {/* Icon */}
      <div className="analytics-icon-wrapper">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="analytics-value">
        <span className="analytics-number">{count}</span>
        <span className="analytics-suffix">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="analytics-label">{stat.label}</p>

      {/* Bottom accent line */}
      <div className="card-accent-line" />
    </motion.div>
  );
}

export default function Analytics() {
  return (
    <section id="analytics" className="analytics-section">
      {/* Ambient background glows */}
      <div className="analytics-bg-glow analytics-bg-glow-1" />
      <div className="analytics-bg-glow analytics-bg-glow-2" />

      {/* Section Title */}
      <motion.div
        className="analytics-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="analytics-title">By The Numbers</h2>
        <p className="analytics-subtitle">
          A snapshot of my journey, contributions, and growth as a developer.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="analytics-grid">
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
