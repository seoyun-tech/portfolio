import { useState, useEffect } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
import IconCircle from '../../components/IconCircle/IconCircle';
import useModalLock from '../../hooks/useModalLock';
import useInView from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';
import './Experience.css';

const LABELS = {
  ko: { sectionTag: '경력', learnMore: '자세히 보기', close: '닫기', prev: '이전', next: '다음' },
  en: { sectionTag: 'Work Experience', learnMore: 'Learn more', close: 'Close', prev: 'Prev', next: 'Next' },
};

const EXPERIENCES = {
  ko: [
    {
      company: '포레',
      role: '개인 브랜드 CEO',
      period: '2022.05 - 2025.10',
      duration: '3년 6개월',
      description: [
        '개인 브랜드 비즈니스 모델 구축 및 총괄',
        '데이터 기반 상품 큐레이션 및 SKU 관리',
        '사용자 데이터 분석 기반 구매 전환율 최적화',
      ],
      works: [
        '/assets/works/1-1.png',
        '/assets/works/1-2.png',
        '/assets/works/1-3.png',
        '/assets/works/1-4.png',
      ],
    },
    {
      company: '㈜남영비비안',
      role: '상품기획 MD',
      period: '2020.03 - 2022.05',
      duration: '2년 4개월',
      description: [
        '자사 브랜드 보완을 위한 수입 브랜드 바잉 운영',
        '데이터 분석 기반 상품 비중(7:3) 구성 및 관리',
        '비주얼 개선 및 비용 절감으로 온라인 매출 40% ↑',
      ],
      works: [
        '/assets/works/2.png',
        '/assets/works/1.png',
        '/assets/works/3.png',
      ],
    },
  ],
  en: [
    {
      company: 'Gongone The Park',
      role: 'Founder',
      period: '2022.05 - 2025.10',
      duration: '3 yrs 6 mos',
      description: [
        "Strategic brand modelling & total management",
        'Data-led product curation & SKU management',
        'Optimised conversion rates via user data analysis',
      ],
      works: [
        '/assets/works/1-1.png',
        '/assets/works/1-2.png',
        '/assets/works/1-3.png',
        '/assets/works/1-4.png',
      ],
    },
    {
      company: 'Namyoung Vivien Co., Ltd.',
      role: 'Product Planning MD',
      period: '2020.03 - 2022.05',
      duration: '2 yrs 4 mos',
      description: [
        'Led import buying to complement in-house brand',
        'Data-led product mix (7:3) planning & management',
        'Boosted online sales by 40% via visual & cost optimization',
      ],
      works: [
        '/assets/works/2.png',
        '/assets/works/1.png',
        '/assets/works/3.png',
      ],
    },
  ],
};

const WorksModal = ({ works, lang, onClose }) => {
  const [current, setCurrent] = useState(0);
  useModalLock(onClose);

  const prev = () => setCurrent(i => (i - 1 + works.length) % works.length);
  const next = () => setCurrent(i => (i + 1) % works.length);

  // 모달 열릴 때 모든 이미지 프리로드
  useEffect(() => {
    works.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [works]);

  // 방향키 / ESC 키보드 조작
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + works.length) % works.length);
      else if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % works.length);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [works.length, onClose]);

  return (
    <div className="works-modal-overlay" onClick={onClose}>
      <div className="works-modal" onClick={e => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label={LABELS[lang].close}>
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="works-modal-image-wrap">
          <img
            src={works[current]}
            alt={`work-${current + 1}`}
            className="works-modal-image"
          />
        </div>

        <div className="works-modal-nav">
          <button className="works-nav-btn" onClick={prev} aria-label={LABELS[lang].prev}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <span className="works-nav-counter">{current + 1} / {works.length}</span>
          <button className="works-nav-btn" onClick={next} aria-label={LABELS[lang].next}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [worksOpen, setWorksOpen] = useState(false);
  const { lang } = useLanguage();
  const [ref, isVisible] = useInView();
  const experiences = EXPERIENCES[lang];
  const activeExp = experiences[activeTab];

  const handleTabClick = (index) => {
    setActiveTab(index);
    setAnimKey(k => k + 1);
  };

  return (
    <>
      <section className={`experience${isVisible ? ' is-visible' : ''}`} id="experience" ref={ref}>
        <div className="experience-container page-container">
          <div className="experience-tag">
            <SectionTag>{LABELS[lang].sectionTag}</SectionTag>
          </div>

          <div className="experience-tabs">
            <nav className="tabs-nav">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`tab-item${activeTab === index ? ' active' : ''}`}
                  onClick={() => handleTabClick(index)}
                >
                  {exp.company}
                </div>
              ))}
            </nav>

            <div className="experience-details" key={animKey}>
              <div className="position-header">
                <h3 className="position-title">{activeExp.role}</h3>
                <div className="period-info">
                  <span>{activeExp.period}</span>
                  <span className="duration">({activeExp.duration})</span>
                </div>
              </div>

              <ul className="description-list">
                {activeExp.description.map((item, idx) => (
                  <li key={idx} className="description-item">{item}</li>
                ))}
              </ul>

              {activeExp.works.length > 0 && (
                <button className="learn-more-btn" onClick={() => setWorksOpen(true)}>
                  <span className="learn-more-text">{LABELS[lang].learnMore}</span>
                  <IconCircle>
                    <i className="fa-solid fa-plus" style={{ fontSize: '12px' }} />
                  </IconCircle>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {worksOpen && (
        <WorksModal
          works={activeExp.works}
          lang={lang}
          onClose={() => setWorksOpen(false)}
        />
      )}
    </>
  );
};

export default Experience;
