import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import Particles from './components/Background';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achivements from "./components/Achivements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Login from "./components/Sign";
import UploadForm from "./components/UploadForm";
import AllProjects from "./components/AllProjects";

function HomePage({ onLoginClick }) {
  return (
    <>
      <main style={{ position: 'relative', marginTop: '-70px', zIndex: 1 }}>
        <HeroSection onLoginClick={onLoginClick} />
        <About />
        <Skills />
        <Projects />
        <Achivements />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showUploadForm) {
    return <UploadForm onClose={() => setShowUploadForm(false)} />;
  }

  // Route wrapper to pass navigation-based handlers into components
  const HomeRoute = () => {
    const navigate = useNavigate();
    return <HomePage onLoginClick={() => navigate('/admin')} />;
  };

  const LoginRoute = () => {
    const navigate = useNavigate();
    return (
      <Login
        onClose={() => navigate('/')}
        onSuccess={() => {
          setShowUploadForm(true);
          navigate('/');
        }}
      />
    );
  };

  return (
    <Router>
      <div style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: -1 
      }}>
        <Particles/>
      </div>

      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/admin" element={<LoginRoute />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;