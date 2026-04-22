import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './pages/Hero/Hero'
import About from './pages/About/About'
import Skill from './pages/Skill/Skill'
import Experience from './pages/Experience/Experience'
import Project from './pages/Project/Project'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'
import ContactDrawer from './components/ContactDrawer/ContactDrawer'
import { CursorProvider } from './context/CursorContext'
import { LanguageProvider } from './context/LanguageContext'
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
  return (
    <LanguageProvider>
      <CursorProvider>
        <div className="App">
          <MainLayout />
        </div>
      </CursorProvider>
    </LanguageProvider>
  )
}

export default App
