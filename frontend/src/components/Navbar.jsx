import { Link } from "react-scroll";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="logo">Rohit<span>Adak</span></div>
      <ul className="nav-links">
        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
          <li key={item}>
            <Link to={item.toLowerCase()} smooth={true} duration={600}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
