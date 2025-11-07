import ScrollFloat from '../components/ScrollFloat';
import LogoLoop from '../components/LogoLoop';
import { motion } from "framer-motion";

const techLogos = [
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/vite.svg", alt: "Vite" },
  { src: "/logos/javascript.svg", alt: "JavaScript" },
  { src: "/logos/typescript.svg", alt: "TypeScript" },
  { src: "/logos/tailwind.svg", alt: "Tailwind CSS" },
  { src: "/logos/python.svg", alt: "Python" },
  { src: "/logos/django.svg", alt: "Django" },
  { src: "/logos/firebase.svg", alt: "Firebase" },
  { src: "/logos/git.svg", alt: "Git" },
  { src: "/logos/github.svg", alt: "GitHub" },
  { src: "/logos/mongodb.svg", alt: "MongoDB" },
  { src: "/logos/fastapi.svg", alt: "FastAPI" },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <ScrollFloat containerClassName="skills-title">My Tech Stack</ScrollFloat>
      
      <div style={{ width: '100%', maxWidth: '900px', position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="right"
          logoHeight={40}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#000000" 
          ariaLabel="My technology skills"
        />
      </div>
    </section>
  );
}