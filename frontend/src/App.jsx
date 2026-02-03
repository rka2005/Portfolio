import { useState, useEffect } from "react";
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
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

  if (showLogin) {
    return (
      <Login 
        onClose={() => setShowLogin(false)} 
        onSuccess={() => {
          setShowLogin(false);
          setShowUploadForm(true);
        }}
      />
    );
  }

  return (
    <>
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
          <>
      <main style={{ position: 'relative', marginTop: '-70px', zIndex: 1 }}>
        <HeroSection onLoginClick={() => setShowLogin(true)} />
        <About />
        <Skills />
        <Projects />
        <Achivements />
        <Contact />
        <Footer />
      </main>
    </>
  )};
  </>
  );
}

export default App;