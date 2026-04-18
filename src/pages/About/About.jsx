import React from 'react';
import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const CONTENT = {
  ko: {
    bioLines: [
      '현장에서 마주한 한계를 직접 돌파하려 코드를 익혔습니다.',
      '화려한 기술보다 중요한 건 문제를 해결하는 기술이기에,',
      '팀의 병목을 뚫고 목표를 향한 최선의 경로를 설계합니다.',
    ],
    details: [
      { label: '생년월일', value: '1994. 05. 11' },
      { label: '학력',     value: 'NTU International College(UK)\nArt & Design · 2015 – 2016\n\nNottingham Trent University(UK)\nFashion Degree(학사) · 2016 – 2019' },
    ],
  },
  en: {
    bioLines: [
      'I taught myself to code to break through the limits I faced on the ground.',
      'What matters isn\'t flashy tech — it\'s technology that solves real problems.',
      'I find the most efficient path to the goal by clearing the team\'s bottlenecks.',
    ],
    details: [
      { label: 'Date of Birth', value: 'May 11, 1994' },
      { label: 'Education',     value: 'NTU International College(UK)\nArt & Design · 2015 – 2016\n\nNottingham Trent University(UK)\nFashion Degree(BA) · 2016 – 2019' },
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
        <div className="about-tag-mobile">
          <SectionTag variant="light">About Me</SectionTag>
        </div>
        <div className="about-layout-grid">

          <div className="about-item image-item">
            <div className="profile-image-frame">
              <img src={PROFILE.photo} alt="박서윤 프로필" className="profile-image-main" />
            </div>
          </div>

          <InfoBox profile={PROFILE} content={CONTENT[lang]} />

        </div>
      </div>
    </section>
  );
};

const InfoBox = ({ profile, content }) => (
  <div className="about-item info-item">
    <div className="about-me-tag">
      <SectionTag variant="light">About Me</SectionTag>
    </div>
    <div className="name-header-group">
      <h2 className="name-ko-title">{profile.koName}</h2>
      <p className="name-en-subtitle">{profile.enName}</p>
    </div>
    <p className="about-bio">{content.bioLines.join('\n')}</p>
    <div className="profile-data-list">
      {content.details.map((item, idx) => (
        <div className="data-row" key={idx} style={{ animationDelay: `${0.5 + idx * 0.15}s` }}>
          <span className="data-label">{item.label}</span>
          <span className="data-value">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default About;
