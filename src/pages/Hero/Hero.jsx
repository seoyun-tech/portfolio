import React from 'react';
import { Link } from 'react-router-dom';
import IconCircle from '../../components/IconCircle/IconCircle';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

const CONTENT = {
  ko: {
    titleLines: ['경험을 데이터로,', '직관을 로직으로 증명하는'],
    subtitle: ['기획자 ', '박서윤', '입니다.'],
  },
  en: {
    titleLines: ['Beyond errors,', 'proving the difference'],
    subtitle: ['I\'m ', 'Seoyun Park', ', a Product Planner.'],
  },
};

const Hero = () => {
  const { lang } = useLanguage();
  const c = CONTENT[lang];

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        <div className="hero-text-content">
          <div className="hero-title-group">
            <h1 className="hero-title">
              {c.titleLines.map((line, i) => (
                <span key={i} className="title-line-wrap">
                  <span className="title-line" style={{ animationDelay: `${0.1 + i * 0.15}s` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-subtitle">
              {c.subtitle[0]}<strong>{c.subtitle[1]}</strong>{c.subtitle[2]}
            </p>
          </div>

          <div className="hero-cta-group">
            <Link to="/contact" className="hero-contact-button">
              <IconCircle>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '12px' }} />
              </IconCircle>
              <span className="hero-contact-text">Contact Me</span>
            </Link>

            <a href="/resume.pdf" className="hero-resume-button" target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <img
            src="/assets/profile.svg"
            alt="기획자 박서윤 프로필"
            className="hero-profile-image"
            loading="eager"
          />
        </div>

        <div className="hero-scroll-indicator">
          <span className="hero-scroll-line" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
