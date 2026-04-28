import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

const MENU = {
  ko: [
    { id: 'home',    label: '홈' },
    { id: 'about',   label: '소개' },
    { id: 'project', label: '프로젝트' },
    { id: 'contact', label: '연락처' },
  ],
  en: [
    { id: 'home',    label: 'Home' },
    { id: 'about',   label: 'About' },
    { id: 'project', label: 'Project' },
    { id: 'contact', label: 'Contact' },
  ],
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang }       = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const switchLang = (l) => {
    setLang(l);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, id) => {
    if (!menuOpen) return;
    e.preventDefault();
    document.body.style.overflow = '';
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 72;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-container">

          <a href="#home" className="navbar-logo">
            <img src="logo.svg" alt="Logo" />
          </a>

          <div className={`nav-panel${menuOpen ? ' open' : ''}`}>
            <ul className="nav-menu">
              {MENU[lang].map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="nav-item" onClick={(e) => handleNavClick(e, id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lang-switcher">
            <span className={lang === 'ko' ? 'active' : ''} onClick={() => switchLang('ko')}>Kr.</span>
            <span className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')}>En.</span>
          </div>

          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="메뉴 열기"
          >
            <span className="hamburger" />
          </button>

        </div>
      </nav>

      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
