import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import useBodyLock from '../../hooks/useBodyLock';
import './Navbar.css';

const MENU = {
  ko: [
    { id: 'home',        label: '홈' },
    { id: 'about',       label: '소개' },
    { id: 'experience',  label: '경력' },
    { id: 'project',     label: '프로젝트' },
    { id: 'skill',       label: '역량' },
    { id: 'contact',     label: '연락처' },
  ],
  en: [
    { id: 'home',        label: 'Home' },
    { id: 'about',       label: 'About' },
    { id: 'experience',  label: 'Experience' },
    { id: 'project',     label: 'Projects' },
    { id: 'skill',       label: 'Skills' },
    { id: 'contact',     label: 'Contact' },
  ],
};

const SECTION_IDS = MENU.ko.map(({ id }) => id);

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState('home');
  const { lang, setLang }         = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 80;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - navHeight - 10) current = id;
      }
      setActiveId(current);
      if (!window.__restoringScroll) history.replaceState(null, '', `#${current}`);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useBodyLock(menuOpen);

  const switchLang = (l) => {
    setLang(l);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, id) => {
    setActiveId(id);
    if (!menuOpen) return;
    e.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-container page-container">

          <a href="#home" className="navbar-logo">
            <img src="logo.svg" alt="Logo" />
          </a>

          <div className={`nav-panel${menuOpen ? ' open' : ''}`}>
            <ul className="nav-menu">
              {MENU[lang].map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className={`nav-item${activeId === id ? ' active' : ''}`} onClick={(e) => handleNavClick(e, id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lang-switcher">
            <span role="button" tabIndex={0} className={lang === 'ko' ? 'active' : ''} onClick={() => switchLang('ko')} onKeyDown={(e) => e.key === 'Enter' && switchLang('ko')}>Kr.</span>
            <span role="button" tabIndex={0} className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')} onKeyDown={(e) => e.key === 'Enter' && switchLang('en')}>En.</span>
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