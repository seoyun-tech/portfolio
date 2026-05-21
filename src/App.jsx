import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './pages/Hero/Hero'
import About from './pages/About/About'
import Experience from './pages/Experience/Experience'
import Project from './pages/Project/Project'
import Skill from './pages/Skill/Skill'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'
import ContactDrawer from './components/ContactDrawer/ContactDrawer'
import CursorDot from './components/CursorDot/CursorDot'
import { LanguageProvider } from './context/LanguageContext'
import SiteMeta from './components/SiteMeta/SiteMeta'
import './App.css'

const MainLayout = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <About />
        <Experience />
        <Project />
        <Skill />
<Contact />
      </main>
      <Footer />
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

function App() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    window.__restoringScroll = true;
    const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 80;
    window.scrollTo({ top: el.offsetTop - navHeight, behavior: 'instant' });
    setTimeout(() => { window.__restoringScroll = false; }, 200);
  }, []);

  return (
    <LanguageProvider>
      <CursorDot>
        <SiteMeta />
        <div className="App">
          <MainLayout />
        </div>
      </CursorDot>
    </LanguageProvider>
  )
}

export default App
