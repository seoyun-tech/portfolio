import { useState } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
import IconButton from '../../components/IconButton/IconButton';
import useModalLock from '../../hooks/useModalLock';
import useInView from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';
import './Project.css';

const LABELS = {
  ko: { learnMore: '자세히 보기' },
  en: { learnMore: 'Learn more' },
};

const META_LABELS = {
  ko: ['기술스택', '배포매체', '작업기간', '기여도', '브라우저 호환성', '특징'],
  en: ['Tech Stack', 'Platform', 'Duration', 'Contribution', 'Browser Compat.', 'Features'],
};

const toFigmaEmbed = (url) =>
  `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

const PROJECTS = [
  {
    number: '01',
    titleLines: [
      { ko: '루키즈(Rookiz)',       en: 'Rookiz',              italic: false },
      { ko: 'AI 키즈 OTT 서비스',  en: 'AI Kids OTT Service', italic: true  },
    ],
    category:    { ko: '풀스택 기획 · 개발',    en: 'Full-Stack Planning & Dev' },
    description: {
      ko: '생성형 AI와 TMDB API를 결합한 키즈 전용 OTT 미디어 서비스입니다. 어린이 맞춤형 콘텐츠 추천과 직관적인 UI를 목표로, 기획부터 풀스택 개발 및 배포까지 전 과정을 수행했습니다.',
      en: 'A kids-only OTT service integrating Generative AI with the TMDB API. With a focus on tailored content and an intuitive UI, I oversaw the full process from concept through to full-stack development and deployment.',
    },
    intent: {
      ko: '기존 OTT는 성인 중심 설계로 어린이가 안전하게 이용하기 어렵습니다. AI 추천으로 연령에 맞는 콘텐츠를 자동 큐레이션하는 키즈 전용 미디어 환경을 기획·구현했습니다.',
      en: "OTT platforms are built for adults, leaving children without a safe option. I developed a kids-only service that uses AI to automatically curate content suited to each child's age and interests.",
    },
    image:       '/assets/project-rookiz-scene.jpg',
    modalImage:  '/assets/project-rookiz-modal.png',
    mobileImage: '/assets/project-rookiz.png',
    embedUrl:    'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4230-7512&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4230%3A7512&page-id=0%3A1&hide-ui=1',
    embedMask:   { top: 83, left: 60.2, width: 359, height: 256, borderRadius: 4 },
    embedBg:     true,
    meta: {
      ko: ['React 19 · FastAPI · Tailwind v4', 'Render',                  '1주',    '100%', 'Chrome · IE · Opera · Safari', '10페이지 · AI 추천 · 반응형'],
      en: ['React 19 · FastAPI · Tailwind v4', 'Render',                  '1 week', '100%', 'Chrome · IE · Opera · Safari', '10 pages · AI Rec · Responsive'],
    },
    links: [
      { label: { ko: '사이트',     en: 'Site'      }, icon: 'fa-solid fa-globe',   url: 'https://rookiz-front.onrender.com/' },
      { label: { ko: 'GitHub',     en: 'GitHub'    }, icon: 'fa-brands fa-github', url: 'https://github.com/seoyun-tech/Rookiz' },
      { label: { ko: '기획서',     en: 'Deck'      }, icon: 'fa-brands fa-figma',  url: 'https://www.figma.com/deck/H3UyjjzSW8Ue5igGsHtDhC' },
      { label: { ko: '프로토타입', en: 'Prototype' }, icon: 'fa-brands fa-figma',  url: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/%E2%9D%A4ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?page-id=0%3A1&node-id=12-1473&p=f&viewport=174%2C621%2C0.05&t=zE9ezWslnC7PYs5k-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=15%3A249&show-proto-sidebar=1' },
    ],
  },
  {
    number: '02',
    titleLines: [
      { ko: '스포티파이(Spotify)', en: 'Spotify',      italic: false },
      { ko: '앱 리디자인',        en: 'App Redesign',  italic: false },
    ],
    category:    { ko: 'UX/UI 기획 및 설계', en: 'UX/UI Planning & Design' },
    description: {
      ko: '스포티파이 앱의 정보 구조와 탐색 흐름을 재설계한 iOS 모바일 앱 리디자인 프로젝트입니다. AI 개인화 추천, 시간 및 상황 기반 Dynamic TPO, AI DJ 등 신규 기능을 기획하고, 온보딩부터 메인 탐색까지 전체 사용자 여정을 Figma 프로토타입으로 구현했습니다.',
      en: "An iOS mobile app redesign project restructuring Spotify's information architecture and navigation flow. I planned new features including AI personalised recommendations, time/context-based Dynamic TPO, and AI DJ, and implemented the full user journey from onboarding to main navigation as a Figma prototype.",
    },
    intent: {
      ko: '음악은 방대하지만 탐색 흐름이 복잡해 원하는 곡을 찾기 어렵습니다. AI 추천과 상황 기반 큐레이션으로 능동적 탐색 없이도 최적의 음악을 만나는 경험을 설계했습니다.',
      en: 'The library is vast, but finding the right song takes too many steps. I redesigned the experience so music finds you, through AI and context-aware recommendations.',
    },
    image:       '/assets/project-spotify-scene.jpg',
    modalImage:  null,
    mobileImage: '/assets/project-spotify.png',
    embedUrl:    'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
    embedMask:   { top: 59, left: 152, width: 177, height: 375, borderRadius: 26 },
    embedBg:     true,
    meta: {
      ko: ['Figma · FigJam', 'Figma 프로토타입', '2주',     '100%', '없음 (모바일 앱)', '10화면 · AI 추천 · Dynamic TPO · AI DJ'],
      en: ['Figma · FigJam', 'Figma Prototype',  '2 weeks', '100%', 'N/A (Mobile App)', '10 screens · AI Rec · Dynamic TPO · AI DJ'],
    },
    links: [
      { label: { ko: '기획서',     en: 'Deck'      }, icon: 'fa-brands fa-figma', url: 'https://www.figma.com/deck/MpwEOgJp09w2yDCL1vJaRO' },
      { label: { ko: '프로토타입', en: 'Prototype' }, icon: 'fa-brands fa-figma', url: 'https://www.figma.com/proto/POw2eRJp17TJFqJAngqN9U/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=229-2016&viewport=-9%2C247%2C0.25&t=qOFoPeUqZAqpYigk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=229%3A2016&show-proto-sidebar=1' },
    ],
  },
  {
    number: '03',
    titleLines: [
      { ko: '무신사(Musinsa)',    en: 'Musinsa',                  italic: false },
      { ko: '반응형 웹 리디자인', en: 'Responsive Web Redesign',  italic: false },
    ],
    category:    { ko: 'UX/UI 기획 · 개발', en: 'UX/UI Planning & Dev' },
    description: {
      ko: '콘텐츠와 커머스의 혼재로 인한 정보 접근성 문제를 해결하기 위해 무신사 웹사이트를 리디자인한 프로젝트입니다. 메인·상세·콘텐츠 3개 페이지를 재설계하고 반응형 레이아웃으로 구현했습니다.',
      en: 'A redesign of the Musinsa website to resolve the information accessibility issues caused by mixed editorial and commerce content. Three core pages — main, detail, and content — were redesigned with a fully responsive layout.',
    },
    intent: {
      ko: '웹진과 쇼핑몰 콘텐츠가 혼재되어 사용자의 목적에 따른 탐색이 어렵습니다. 두 기능을 독립적으로 강화하고, 백화점 공간에서 영감을 얻은 [진입 → 욕구 → 구매 → 탐색] 흐름과 스타일 클러스터링으로 맞춤형 쇼핑 경험을 설계했습니다.',
      en: "Musinsa's webzine and shop content are intertwined, making purposeful navigation difficult. I strengthened each function independently, building an [Entry → Desire → Purchase → Exploration] flow inspired by department store design, with style clustering for a personalised experience.",
    },
    image:       '/assets/project-musinsa-scene.png',
    modalImage:  '/assets/project-musinsa.png',
    mobileImage: '/assets/project-musinsa.png',
    meta: {
      ko: ['HTML · CSS · JavaScript', 'GitHub Pages', '2주',     '100%', 'Chrome · Safari · Firefox', '3페이지 · 모달 구성 · 반응형'],
      en: ['HTML · CSS · JavaScript', 'GitHub Pages', '2 weeks', '100%', 'Chrome · Safari · Firefox', '3 pages · Modal-based · Responsive'],
    },
    links: [
      { label: { ko: '사이트', en: 'Site'   }, icon: 'fa-solid fa-globe',   url: 'https://seoyun-tech.github.io/projectA/' },
      { label: { ko: 'GitHub', en: 'GitHub' }, icon: 'fa-brands fa-github', url: 'https://github.com/seoyun-tech/projectA' },
      { label: { ko: '기획서', en: 'Deck'   }, icon: 'fa-brands fa-figma',  url: 'https://www.figma.com/deck/6Q8nPmaCiP7fqgZbKrHWZF' },
    ],
  },
];

const ProjectModal = ({ proj, lang, onClose }) => {
  useModalLock(onClose);
  const metaLabels = META_LABELS[lang];
  const metaValues = proj.meta?.[lang];

  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <img
          src={proj.modalImage ?? proj.image}
          alt={proj.titleLines[0][lang]}
          className="proj-modal-image"
        />

        <div className="proj-modal-header">
          <SectionTag noIcon>{proj.number}</SectionTag>
          <SectionTag noIcon>{proj.category[lang]}</SectionTag>
        </div>

        <h3 className="proj-modal-title">
          {proj.titleLines.map((line, i) => (
            <span key={i} className={line.italic ? 'proj-title-italic' : ''}>
              {line[lang]}
            </span>
          ))}
        </h3>

        {proj.intent && <p className="proj-modal-desc">{proj.intent[lang]}</p>}

        {metaValues && (
          <div className="proj-meta-grid">
            {metaLabels.map((label, i) => (
              <div key={label} className="proj-meta-item">
                <span className="proj-meta-label">{label}</span>
                <span className="proj-meta-value">{metaValues[i]}</span>
              </div>
            ))}
          </div>
        )}

        {proj.links && (
          <div className="proj-modal-links">
            {proj.links.map(({ label, icon, url }) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="proj-modal-link-btn">
                <i className={icon} />
                <span>{label[lang]}</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectBlock = ({ proj, i, lang, onOpen }) => {
  const [ref, visible] = useInView();

  return (
    <div ref={ref} className={`project-block${visible ? ' is-visible' : ''}`} style={{ zIndex: i + 1 }}>
      <div className="project-container">
        <div className="proj-left">
          <div className="proj-number-row">
            <SectionTag noIcon>{proj.number}</SectionTag>
            <div className="proj-category-mobile">
              <SectionTag noIcon>{proj.category[lang]}</SectionTag>
            </div>
          </div>

          <h3 className="proj-title">
            {proj.titleLines.map((line, li) => (
              <span key={li} className={line.italic ? 'proj-title-italic' : ''}>
                {line[lang]}
              </span>
            ))}
          </h3>

          <p className="proj-desc">{proj.description[lang]}</p>

          <IconButton
            icon="fa-solid fa-arrow-up-right-from-square"
            onClick={() => (proj.meta || proj.links) && onOpen(proj)}
            style={!proj.meta && !proj.links ? { opacity: 0.3, cursor: 'default' } : {}}
          >
            {LABELS[lang].learnMore}
          </IconButton>
        </div>

        <div className="proj-right">
          <div className="proj-category">
            <SectionTag noIcon>{proj.category[lang]}</SectionTag>
          </div>
          <div className={`proj-image-wrap${(proj.embedUrl || proj.screenImage || proj.mobileImage) ? ' proj-image-wrap--embed' : ''}`}>
            {(proj.embedUrl || proj.screenImage || proj.mobileImage) ? (
              <>
                {(proj.embedUrl || proj.screenImage) ? (
                  <img src={proj.image} alt="" aria-hidden="true" className="proj-embed-bg" />
                ) : (
                  <img src={proj.image} alt={`${proj.titleLines[0][lang]} project`} className="proj-image" />
                )}
                {(proj.embedUrl || proj.screenImage) && (
                  <div className="proj-embed-mask" style={proj.embedMask}>
                    {proj.embedUrl ? (
                      <iframe
                        src={toFigmaEmbed(proj.embedUrl)}
                        className="proj-image-embed"
                        title={`${proj.titleLines[0][lang]} prototype`}
                        allow="fullscreen; clipboard-write"
                        allowFullScreen
                        loading="eager"
                      />
                    ) : (
                      <img
                        src={proj.screenImage}
                        alt={`${proj.titleLines[0][lang]} project`}
                        className="proj-image-embed"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    )}
                  </div>
                )}
                {proj.mobileImage && (
                  <img src={proj.mobileImage} alt={`${proj.titleLines[0][lang]} project`} className="proj-mobile-image" />
                )}
              </>
            ) : (
              <img
                src={proj.image}
                alt={`${proj.titleLines[0][lang]} project`}
                className="proj-image"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { lang } = useLanguage();

  return (
    <>
      <section className="project-section" id="project">
        {PROJECTS.map((proj, i) => (
          <ProjectBlock
            key={proj.number}
            proj={proj}
            i={i}
            lang={lang}
            onOpen={setActiveModal}
          />
        ))}
      </section>

      {activeModal && (
        <ProjectModal proj={activeModal} lang={lang} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

export default Project;
