import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './pages/Hero/Hero'
import About from './pages/About/About'
import Skill from './pages/Skill/Skill'
import Experience from './pages/Experience/Experience'
import Education from './pages/Education/Education'
import Project from './pages/Project/Project'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'
import ContactPage from './pages/ContactPage/ContactPage'
import { CursorProvider } from './context/CursorContext'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skill />
      <Experience />
      <Education />
      <Project />
      <Contact />
    </main>
    <Footer />
  </>
)

function App() {
  return (
    <LanguageProvider>
      <CursorProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CursorProvider>
    </LanguageProvider>
  )
}

export default App
