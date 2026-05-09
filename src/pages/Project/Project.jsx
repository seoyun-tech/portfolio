import { useState } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
import IconButton from '../../components/IconButton/IconButton';
import useModalLock from '../../hooks/useModalLock';
import useInView from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';
import './Project.css';

const LABELS = {
  ko: { learnMore: '자세히 보기', tabMd: '패션', tabIt: 'IT' },
  en: { learnMore: 'Learn more', tabMd: 'Fashion', tabIt: 'IT' },
};

const META_LABELS_MD = {
  ko: ['담당 업무', '핸들링 브랜드', '주요 성과', '운영 채널'],
  en: ['Role', 'Brands Handled', 'Key Results', 'Channel'],
};

const META_LABELS_IT = {
  ko: ['기술스택', '배포매체', '작업기간', '기여도', '브라우저 호환성', '특징'],
  en: ['Tech Stack', 'Platform', 'Duration', 'Contribution', 'Browser Compat.', 'Features'],
};

const toFigmaEmbed = (url) =>
  `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

const MD_PROJECTS = [
  {
    number: '01',
    isMd: true,
    titleLines: [
      { ko: '㈜남영비비안',         en: 'Namyoung Vivien',          italic: false },
      { ko: '온라인 채널 리빌딩',   en: 'Online Channel Rebuild',   italic: true  },
    ],
    category: { ko: '온라인 MD · 마케팅', en: 'Online MD · Marketing' },
    description: {
      ko: '온라인 매출이 저조한 자사 브랜드 바바라의 원인을 분석한 결과, 타겟과 맞지 않는 모델·컨셉과 방치된 디지털 채널이 문제였습니다. 촬영 비용을 최적화하면서 컨셉을 전면 교체하고, SNS 감성 전환, 인플루언서 마케팅, 자사몰 리뉴얼, 온라인 전용 상품 기획을 단계적으로 실행했습니다.',
      en: "Diagnosed the root cause of poor online sales for in-house brand Barbara — a mismatched model concept and neglected digital channels. Optimised shoot costs while fully refreshing the concept, then executed a staged turnaround: overhauled SNS aesthetic, ran influencer campaigns, relaunched the brand site, and planned online-exclusive products.",
    },
    image: '/assets/works/vivien-main.png',
    works: ['/assets/works/vivien-online-1.png', '/assets/works/vivien-online-2.png'],
    meta: {
      ko: ['온라인 MD · SNS · 인플루언서 마케팅', '1개', '온라인 매출 40% ↑', '자사몰 · SNS'],
      en: ['Online MD · SNS · Influencer Marketing', '1 Brand', 'Online sales +40%', 'Brand Site · SNS'],
    },
  },
  {
    number: '02',
    isMd: true,
    titleLines: [
      { ko: '㈜남영비비안',           en: 'Namyoung Vivien',            italic: false },
      { ko: '수입 브랜드 바잉 구축',  en: 'Import Brand Buying Setup',  italic: true  },
    ],
    category: { ko: '바잉 MD · 소싱', en: 'Buying MD · Sourcing' },
    description: {
      ko: '기존 수입 브랜드 라인업에서 이탈한 브랜드의 공백을 메우기 위해 대체 브랜드를 선별하고, 브랜드 선정부터 발주·재고 관리·트렌드 적용까지 전 과정을 단독으로 구축·운영했습니다. 자사 브랜드의 납기·불량 이슈를 보완하고 스타일 다양성과 글로벌 트렌드를 함께 수혈했습니다.',
      en: 'Identified and onboarded replacements for brands that exited the existing import lineup, then solely built and operated the full buying cycle — from scouting and selection to ordering, inventory management, and trend application. Addressed gaps caused by in-house brand delivery and quality issues while broadening style diversity and injecting global trends.',
    },
    image: '/assets/works/vivien-buying-main.png',
    works: ['/assets/works/vivien-buying-1.png'],
    meta: {
      ko: ['바잉 MD · 소싱 · 재고 관리', '4개', '바바라 전체 매출 20% ↑ · 카테고리 공백 해소', '백화점'],
      en: ['Buying MD · Sourcing · Inventory', '4 Brands', 'Barbara total sales +20% · Category gap resolved', 'Dept. Store'],
    },
  },
  {
    number: '03',
    isMd: true,
    titleLines: [
      { ko: '포레(Poroe)',        en: 'Poroe',              italic: false },
      { ko: '브랜드 피벗 & 런칭', en: 'Brand Pivot & Launch', italic: true  },
    ],
    category: { ko: '브랜드 CEO · 기획', en: 'Brand CEO · Planning' },
    description: {
      ko: '첫 브랜드(공원더파크)는 니트웨어 브랜드로 디자인적으로 인정받았지만, 니트웨어 특성상 높은 MOQ·불량·납기 문제가 구조적 한계로 작용해 재고 압박이 지속됐습니다. 이를 해결하기 위해 다이마루 카테고리를 추가했으나 MOQ 문제는 여전했습니다. 이후 코펜하겐 감성의 키 큰 여성 전용 니치 브랜드로 완전 피벗하고, SNS 인플루언서 마케팅을 집중적으로 전개했습니다.',
      en: 'The first brand (Gongone the Park) earned design recognition, but structural limits in knitwear — high MOQ, defect rates, and lead time issues — created persistent inventory pressure. Added an interlock jersey category to address these constraints, but MOQ remained an issue. Executed a full pivot to a niche Copenhagen-style brand for tall women and concentrated influencer marketing efforts.',
    },
    image: '/assets/works/poroe-main.png',
    works: ['/assets/works/poroe-1.png', '/assets/works/poroe-2.png', '/assets/works/poroe-3.png'],
    meta: {
      ko: ['브랜드 기획 · 피벗 · 운영 총괄', '2개', '연 매출 30% ↑', '자사몰 · SNS'],
      en: ['Brand Planning · Pivot · Total Ops', '2 Brands', 'Annual sales +30%', 'Brand Site · SNS'],
    },
  },
];

const IT_PROJECTS = [
  {
    number: '01',
    titleLines: [
      { ko: '루키즈(Rookiz)',       en: 'Rookiz',              italic: false },
      { ko: 'AI 키즈 OTT 서비스',  en: 'AI Kids OTT Service', italic: true  },
    ],
    category:    { ko: '풀스택 기획 · 개발',    en: 'Full-Stack Planning & Dev' },
    description: {
      ko: '사용자 맞춤형 큐레이션 로직을 이해하기 위해, API 데이터 가공부터 AI 엔진 구현까지 전 과정을 수행했습니다. 기획자의 분석 역량을 기술로 구현해 최적의 추천 원리를 체득한 프로젝트입니다.',
      en: "Executed the full development cycle — from API data processing to AI engine implementation — to master personalised curation logic and recommendation principles.",
    },
    intent: {
      ko: '기존 OTT는 성인 중심 설계로 어린이가 안전하게 이용하기 어렵습니다. AI 추천으로 연령에 맞는 콘텐츠를 자동 큐레이션하는 키즈 전용 미디어 환경을 기획·구현했습니다.',
      en: "Addressed safety concerns in adult-centric OTT platforms by designing a dedicated kids' media environment. Implemented AI-driven automation to curate age-appropriate content.",
    },
    image:       '/assets/project-rookiz-scene.jpg',
    modalImage:  '/assets/project-rookiz-modal.png',
    mobileImage: '/assets/project-rookiz.png',
    embedUrl:    'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4230-7512&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4230%3A7512&page-id=0%3A1&hide-ui=1',
    embedMask:   { top: 83, left: 60.2, width: 359, height: 256, borderRadius: 4 },
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
      ko: '방대한 데이터 속에서 고객의 이탈을 막고 최적의 취향을 제안하는 탐색 흐름을 설계했습니다. 상황별(TPO) 큐레이션 전략을 IT 기술과 결합하여 개인화 서비스의 핵심 UX를 제시했습니다.',
      en: 'Designed a strategic discovery flow to minimise churn and suggest optimal preferences within vast data environments. Delivered core personalised UX by integrating TPO-based curation strategies with advanced technical solutions.',
    },
    intent: {
      ko: '음악은 방대하지만 탐색 흐름이 복잡해 원하는 곡을 찾기 어렵습니다. AI 추천과 상황 기반 큐레이션으로 능동적 탐색 없이도 최적의 음악을 만나는 경험을 설계했습니다.',
      en: 'Overcame navigation complexities in vast music libraries by designing an effortless discovery experience. Leveraged AI recommendations and context-based curation to deliver optimal tracks without active searching.',
    },
    image:       '/assets/project-spotify-scene.jpg',
    modalImage:  '/assets/project-spotify-modal.png',
    mobileImage: '/assets/project-spotify.png',
    embedUrl:    'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
    embedMask:   { top: 59, left: 152, width: 177, height: 375, borderRadius: 26 },
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
      en: "Redesigned the Musinsa website to enhance information accessibility by separating mixed content and commerce. Reconstructed main, product, and content pages into a fully responsive layout.",
    },
    intent: {
      ko: '웹진과 쇼핑몰 콘텐츠가 혼재되어 사용자의 목적에 따른 탐색이 어렵습니다. 두 기능을 독립적으로 강화하고, 백화점 공간에서 영감을 얻은 [진입 → 욕구 → 구매 → 탐색] 흐름과 스타일 클러스터링으로 맞춤형 쇼핑 경험을 설계했습니다.',
      en: "Resolved navigation complexities caused by the overlap of webzine and e-commerce content. Engineered a tailored shopping experience through style clustering and a strategic flow inspired by department store layouts.",
    },
    image:       '/assets/project-musinsa-scene.png',
    modalImage:  '/assets/project-musinsa-modal.png',
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
  const [worksIdx, setWorksIdx] = useState(0);
  useModalLock(onClose);
  const metaLabels = proj.isMd ? META_LABELS_MD[lang] : META_LABELS_IT[lang];
  const metaValues = proj.meta?.[lang];

  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        {proj.works ? (
          <>
            <img src={proj.works[worksIdx]} alt={proj.titleLines[0][lang]} className="proj-modal-image" />
            {proj.works.length > 1 && (
              <div className="proj-works-thumbs">
                {proj.works.map((src, i) => (
                  <button
                    key={i}
                    className={`proj-works-thumb${i === worksIdx ? ' active' : ''}`}
                    onClick={() => setWorksIdx(i)}
                    aria-label={`이미지 ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <img src={proj.modalImage ?? proj.image} alt={proj.titleLines[0][lang]} className="proj-modal-image" />
        )}

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

const ProjectImage = ({ proj, lang }) => {
  const title = `${proj.titleLines[0][lang]} project`;
  const hasEmbed = !!proj.embedUrl;
  const hasVariants = hasEmbed || !!proj.mobileImage;

  if (!hasVariants) {
    return (
      <div className="proj-image-wrap">
        <img src={proj.image} alt={title} className="proj-image" />
      </div>
    );
  }

  return (
    <div className="proj-image-wrap proj-image-wrap--embed">
      <img
        src={proj.image}
        alt={hasEmbed ? '' : title}
        aria-hidden={hasEmbed || undefined}
        className={hasEmbed ? 'proj-embed-bg' : 'proj-image'}
      />
      {hasEmbed && (
        <div className="proj-embed-mask" style={proj.embedMask}>
          <iframe
            src={toFigmaEmbed(proj.embedUrl)}
            className="proj-image-embed"
            title={`${proj.titleLines[0][lang]} prototype`}
            allow="fullscreen; clipboard-write"
            allowFullScreen
            loading="eager"
          />
        </div>
      )}
      {proj.mobileImage && (
        <img src={proj.mobileImage} alt={title} className="proj-mobile-image" />
      )}
    </div>
  );
};

const ProjectBlock = ({ proj, i, lang, onOpen }) => {
  const [ref, visible] = useInView();

  return (
    <div ref={ref} className={`project-block${visible ? ' is-visible' : ''}`} style={{ zIndex: i + 1 }}>
      <div className="project-container page-container">
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
          <ProjectImage proj={proj} lang={lang} />
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState('md');
  const { lang } = useLanguage();
  const projects = activeTab === 'md' ? MD_PROJECTS : IT_PROJECTS;

  return (
    <>
      <section className="project-section" id="project">
        <div className="project-tabs-wrap page-container">
          <div className="project-tabs">
            <button
              className={`project-tab${activeTab === 'md' ? ' active' : ''}`}
              onClick={() => setActiveTab('md')}
            >
              {LABELS[lang].tabMd}
            </button>
            <button
              className={`project-tab${activeTab === 'it' ? ' active' : ''}`}
              onClick={() => setActiveTab('it')}
            >
              {LABELS[lang].tabIt}
            </button>
          </div>
        </div>

        {projects.map((proj, i) => (
          <ProjectBlock
            key={proj.number + activeTab}
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
