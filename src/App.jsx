import { useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './pages/Hero/Hero'
import { CursorProvider } from './context/CursorContext'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

const About = lazy(() => import('./pages/About/About'))
const Skill = lazy(() => import('./pages/Skill/Skill'))
const Experience = lazy(() => import('./pages/Experience/Experience'))
const Project = lazy(() => import('./pages/Project/Project'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const Footer = lazy(() => import('./components/Footer/Footer'))
const ContactDrawer = lazy(() => import('./components/ContactDrawer/ContactDrawer'))

const MainLayout = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <Suspense fallback={null}>
          <About />
          <Experience />
          <Project />
          <Skill />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </Suspense>
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
