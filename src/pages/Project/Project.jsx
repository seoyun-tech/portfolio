import React, { useState, useEffect, useRef } from 'react';
import IconCircle from '../../components/IconCircle/IconCircle';
import SectionTag from '../../components/SectionTag/SectionTag';
import { useLanguage } from '../../context/LanguageContext';
import './Project.css';

const PROJECTS = {
  ko: [
    {
      number: '01',
      titleLines: [
        { text: '루키즈(Rookiz)', italic: false },
        { text: 'AI 키즈 OTT 서비스', italic: true },
      ],
      category: '풀스택 기획 · 개발',
      description:
        '생성형 AI와 TMDB API를 결합한 키즈 전용 OTT 미디어 서비스입니다. 어린이 맞춤형 콘텐츠 추천과 직관적인 UI를 목표로, 기획부터 프론트엔드·백엔드 개발 및 배포까지 전 과정을 수행했습니다.',
      image: '/assets/project-rookiz.png',
      meta: [
        { label: '기술스택',        value: 'React 19 · FastAPI · Tailwind v4' },
        { label: '배포매체',        value: 'Render' },
        { label: '작업기간',        value: '1주' },
        { label: '기여도',          value: '100%' },
        { label: '브라우저 호환성', value: 'Chrome · IE · Opera · Safari' },
        { label: '페이지 수 / 특징', value: '10페이지 · AI 추천 · 반응형' },
      ],
      links: [
        { label: '사이트 보기',  icon: 'fa-solid fa-globe',   url: 'https://rookiz-front.onrender.com/' },
        { label: 'GitHub',       icon: 'fa-brands fa-github', url: 'https://github.com/seoyun-tech/Rookiz' },
        { label: '기획서 보기',  icon: 'fa-brands fa-figma',  url: 'https://www.figma.com/deck/H3UyjjzSW8Ue5igGsHtDhC' },
      ],
    },
    {
      number: '02',
      titleLines: [
        { text: '스포티파이(Spotify)', italic: false },
        { text: '앱 리디자인', italic: false },
      ],
      category: 'UX/UI 기획 및 설계',
      description:
        '스포티파이 앱의 정보 구조와 탐색 흐름을 재설계한 iOS 모바일 앱 리디자인 프로젝트입니다. AI 개인화 추천(AI FOR YOU), 시간·상황 기반 Dynamic TPO, AI DJ 등 신규 기능을 기획하고, 온보딩부터 메인 탐색까지 전체 사용자 여정을 Figma 프로토타입으로 구현했습니다.',
      image: '/assets/project-spotify.png',
      meta: [
        { label: '기술스택',        value: 'Figma · FigJam' },
        { label: '배포매체',        value: 'Figma 프로토타입 (iOS)' },
        { label: '작업기간',        value: '2주' },
        { label: '기여도',          value: '100%' },
        { label: '브라우저 호환성', value: '없음 (모바일 앱)' },
        { label: '화면 수 / 특징',  value: '10화면 · AI 추천 · Dynamic TPO · AI DJ' },
      ],
      links: [
        { label: '프로토타입 보기', icon: 'fa-brands fa-figma', url: 'https://www.figma.com/proto/POw2eRJp17TJFqJAngqN9U/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=229-2016&viewport=-9%2C247%2C0.25&t=qOFoPeUqZAqpYigk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=229%3A2016&show-proto-sidebar=1' },
        { label: '기획서 보기',     icon: 'fa-brands fa-figma', url: 'https://www.figma.com/deck/MpwEOgJp09w2yDCL1vJaRO' },
      ],
    },
    {
      number: '03',
      titleLines: [
        { text: '무신사(Musinsa)', italic: false },
        { text: '반응형 웹 리디자인', italic: false },
      ],
      category: 'UX/UI 기획 및 설계',
      description:
        '사용자 행동 데이터를 기반으로 무신사 웹사이트의 탐색 흐름을 재설계하고 반응형 레이아웃을 구현한 프로젝트입니다. 데스크톱과 모바일 모두에서 일관된 쇼핑 경험을 제공하는 것을 목표로 했습니다.',
      image: '/assets/project-musinsa.png',
      meta: null,
      links: null,
    },
  ],
  en: [
    {
      number: '01',
      titleLines: [
        { text: 'Rookiz', italic: false },
        { text: 'AI Kids OTT Service', italic: true },
      ],
      category: 'Full-Stack Planning & Dev',
      description:
        'A kids-only OTT media service combining generative AI with the TMDB API. Targeting child-tailored content recommendations and an intuitive UI, I handled the entire process independently — from planning to frontend/backend development and deployment.',
      image: '/assets/project-rookiz.png',
      meta: [
        { label: 'Tech Stack',         value: 'React 19 · FastAPI · Tailwind v4' },
        { label: 'Platform',           value: 'Render' },
        { label: 'Duration',           value: '1 week' },
        { label: 'Contribution',       value: '100%' },
        { label: 'Browser Compat.',    value: 'Chrome · IE · Opera · Safari' },
        { label: 'Pages / Features',   value: '10 pages · AI Rec · Responsive' },
      ],
      links: [
        { label: 'Visit Site', icon: 'fa-solid fa-globe',   url: 'https://rookiz-front.onrender.com/' },
        { label: 'GitHub',     icon: 'fa-brands fa-github', url: 'https://github.com/seoyun-tech/Rookiz' },
        { label: 'View Deck',  icon: 'fa-brands fa-figma',  url: 'https://www.figma.com/deck/H3UyjjzSW8Ue5igGsHtDhC' },
      ],
    },
    {
      number: '02',
      titleLines: [
        { text: 'Spotify', italic: false },
        { text: 'App Redesign', italic: false },
      ],
      category: 'UX/UI Planning & Design',
      description:
        'An iOS mobile app redesign project restructuring Spotify\'s information architecture and navigation flow. I planned new features including AI personalized recommendations (AI FOR YOU), time/context-based Dynamic TPO, and AI DJ, and implemented the full user journey from onboarding to main navigation as a Figma prototype.',
      image: '/assets/project-spotify.png',
      meta: [
        { label: 'Tech Stack',        value: 'Figma · FigJam' },
        { label: 'Platform',          value: 'Figma Prototype (iOS)' },
        { label: 'Duration',          value: '2 weeks' },
        { label: 'Contribution',      value: '100%' },
        { label: 'Browser Compat.',   value: 'N/A (Mobile App)' },
        { label: 'Screens / Features', value: '10 screens · AI Rec · Dynamic TPO · AI DJ' },
      ],
      links: [
        { label: 'View Prototype', icon: 'fa-brands fa-figma', url: 'https://www.figma.com/proto/POw2eRJp17TJFqJAngqN9U/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=229-2016&viewport=-9%2C247%2C0.25&t=qOFoPeUqZAqpYigk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=229%3A2016&show-proto-sidebar=1' },
        { label: 'View Deck',      icon: 'fa-brands fa-figma', url: 'https://www.figma.com/deck/MpwEOgJp09w2yDCL1vJaRO' },
      ],
    },
    {
      number: '03',
      titleLines: [
        { text: 'Musinsa', italic: false },
        { text: 'Responsive Web Redesign', italic: false },
      ],
      category: 'UX/UI Planning & Design',
      description:
        'A project to redesign the navigation flow of the Musinsa website based on user behavior data and implement a responsive layout. The goal was to provide a consistent shopping experience on both desktop and mobile.',
      image: '/assets/project-musinsa.png',
      meta: null,
      links: null,
    },
  ],
};

const ProjectModal = ({ proj, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>

        <button className="proj-modal-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="proj-modal-header">
          <SectionTag noIcon>{proj.number}</SectionTag>
          <SectionTag noIcon>{proj.category}</SectionTag>
        </div>

        <h3 className="proj-modal-title">
          {proj.titleLines.map((line, i) => (
            <span key={i} className={line.italic ? 'proj-title-italic' : ''}>
              {line.text}
            </span>
          ))}
        </h3>

        <p className="proj-modal-desc">{proj.description}</p>

        {proj.meta && (
          <div className="proj-meta-grid">
            {proj.meta.map(({ label, value }) => (
              <div key={label} className="proj-meta-item">
                <span className="proj-meta-label">{label}</span>
                <span className="proj-meta-value">{value}</span>
              </div>
            ))}
          </div>
        )}

        {proj.links && (
          <div className="proj-modal-links">
            {proj.links.map(({ label, icon, url }) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="proj-modal-link-btn">
                <i className={icon} />
                <span>{label}</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

const ProjectBlock = ({ proj, i, total, onOpen }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`project-block ${visible ? 'is-visible' : ''}`} style={{ zIndex: i + 1 }}>
      <div className="project-container">

        <div className="proj-left">
          <div className="proj-number-row">
            <SectionTag noIcon>{proj.number}</SectionTag>
            <div className="proj-category-mobile">
              <SectionTag noIcon>{proj.category}</SectionTag>
            </div>
          </div>

          <h3 className="proj-title">
            {proj.titleLines.map((line, li) => (
              <span key={li} className={line.italic ? 'proj-title-italic' : ''}>
                {line.text}
              </span>
            ))}
          </h3>

          <p className="proj-desc">{proj.description}</p>

          <button
            className="proj-learn-btn"
            onClick={() => proj.meta && onOpen(proj)}
            style={!proj.meta ? { opacity: 0.3, cursor: 'default' } : {}}
          >
            <IconCircle>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '12px' }} />
            </IconCircle>
            <span className="proj-learn-text">Learn more</span>
          </button>

        </div>

        <div className="proj-right">
          <div className="proj-category proj-category-desktop">
            <SectionTag noIcon>{proj.category}</SectionTag>
          </div>
          <div className="proj-image-wrap">
            <img
              src={proj.image}
              alt={`${proj.titleLines[0].text} project`}
              className="proj-image"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

const Project = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { lang } = useLanguage();
  const projects = PROJECTS[lang];

  return (
    <>
      <section className="project-section" id="project">
        {projects.map((proj, i) => (
          <ProjectBlock
            key={proj.number}
            proj={proj}
            i={i}
            total={projects.length}
            onOpen={setActiveModal}
          />
        ))}
      </section>

      {activeModal && (
        <ProjectModal proj={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

export default Project;
