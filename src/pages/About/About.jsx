import React, { useState, useEffect } from 'react';
import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const CONTENT = {
  ko: {
    details: [
      { label: '생년월일', value: '1994. 05. 11' },
      { label: '거주지',   value: '서울시 용산구' },
    ],
  },
  en: {
    details: [
      { label: 'Date of Birth', value: 'May 11, 1994' },
      { label: 'Location',      value: 'Yongsan-gu, Seoul' },
    ],
  },
};

const PROFILE = {
  koName: '박서윤',
  enName: 'Park Seo-yun',
  photo:  '/assets/about-photo.svg',
};

const About = () => {
  const [ref, isVisible] = useInView();
  const { lang } = useLanguage();

  return (
    <section
      className={`about-section ${isVisible ? 'is-visible' : ''}`}
      id="about"
      ref={ref}
    >
      <VideoBackground videoOpacity={0.4} overlay="rgba(12, 42, 27, 0.2)" />

      <div className="about-content-wrapper">
        <div className="about-layout-grid">

          <StatsBox isVisible={isVisible} />

          <div className="about-item image-item">
            <div className="profile-image-frame">
              <img src={PROFILE.photo} alt="박서윤 프로필" className="profile-image-main" />
            </div>
          </div>

          <InfoBox profile={PROFILE} details={CONTENT[lang].details} />

        </div>
      </div>
    </section>
  );
};

const StatsBox = ({ isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    // 숫자 간 딜레이 — 뒤로 갈수록 느려져서 자연스럽게 멈춥니다
    const delays = [0, 100, 200, 320, 480, 700];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setCount(i), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div className="about-item stats-item">
      <div className="stats-box-inner">
        <div className="stats-number-huge">
          {count}<span className="stats-plus">+</span>
        </div>
        <SectionTag variant="light">Years of experience</SectionTag>
      </div>
    </div>
  );
};

const InfoBox = ({ profile, details }) => (
  <div className="about-item info-item">
    <div className="info-box-inner">
      <div className="about-me-tag">
        <SectionTag variant="light">About Me</SectionTag>
      </div>
      <div className="name-header-group">
        <h2 className="name-ko-title">{profile.koName}</h2>
        <p className="name-en-subtitle">{profile.enName}</p>
      </div>
      <div className="profile-data-list">
        {details.map((item, idx) => (
          <div className="data-row" key={idx}>
            <span className="data-label">{item.label}</span>
            <span className="data-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
