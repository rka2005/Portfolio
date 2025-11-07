import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';

export default function Footer() {
  // --- IMPORTANT ---
  // Replace these with your actual links!
  const githubLink = "https://github.com/your-username";
  const linkedinLink = "https://linkedin.com/in/your-profile";
  const emailLink = "mailto:your-email@example.com";

  return (
    <footer className="footer-container">
      <div className="footer-socials">
        <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <SiGithub />
        </a>
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <SiLinkedin />
        </a>
        <a href={emailLink} aria-label="Email">
          <SiGmail />
        </a>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Rohit Kumar Adak. All rights reserved.
      </p>
    </footer>
  );
}