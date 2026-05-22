import { useState } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
import IconButton from '../../components/IconButton/IconButton';
import useModalLock from '../../hooks/useModalLock';
import useInView from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';
import './Project.css';

const LABELS = {
  ko: {
    learnMore: '자세히 보기',
    tabMd: '패션 MD',
    tabIt: '디지털(보조)',
  },
  en: {
    learnMore: 'Learn more',
    tabMd: 'Fashion MD',
    tabIt: 'Digital Skills',
  },
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
    worksVertical: true,
    titleLines: [
      { ko: '바바라(barbara)',   en: 'Barbara',            italic: false },
      { ko: '수입 브랜드 포트폴리오 재편',  en: 'Import Brand Portfolio Restructure',  italic: true  },
    ],
    category: { ko: '바잉 MD · 소싱', en: 'Buying MD · Sourcing' },
    description: {
      ko: '매출 데이터 분석을 기반으로 기존 브랜드 포트폴리오를 재편하고, 샹텔(프랑스)·에버제이(미국)·플루토(벨기에) 3개국 브랜드 바잉 및 운영을 담당했습니다. 브랜드별 가격 전략을 차등 운영하는 편집샵형 멀티 브랜드 구성을 정리했습니다.',
      en: 'Restructured the existing brand portfolio through sales data analysis and led buying and operations for Chantel (France), Everjay (US) and Pluto (Belgium). Structured a curated multi-brand lineup with differentiated pricing strategies by brand.',
    },
    image: '/assets/works/vivien-buying-main.png',
    works: ['/assets/works/vivien-buying-1.png'],
    meta: {
      ko: ['바잉 MD · 글로벌 소싱 · 재고 관리', '4개', '전년 대비 매출 8.2%↑ · 목표 108% 달성 · 판매율: 샹텔 52% · 에버제이 39% · 플루토 64%', '백화점'],
      en: ['Buying MD · Global Sourcing · Inventory', '4 brands', 'Sales +8.2% YoY · 108% of target · Sell-through: Chantel 52% · Everjay 39% · Pluto 64%', 'Dept. Store'],
    },
  },
  {
    number: '02',
    isMd: true,
    worksVertical: true,
    titleLines: [
      { ko: '바바라(barbara)', en: 'Barbara',          italic: false },
      { ko: '온라인 채널 리뉴얼',   en: 'Online Channel Renewal',   italic: true  },
    ],
    category: { ko: '온라인 기획 · 마케팅', en: 'Online Planning · Marketing' },
    description: {
      ko: '자사 브랜드 바바라의 온라인 부진을 타겟 불일치와 채널 운영 부재로 정의하고, 온라인 채널 리뉴얼을 기획했습니다. 촬영, SNS, 온라인 전용 상품 기획으로 2030 신규 타겟 디지털 전환을 진행했습니다.',
      en: 'Defined weak online performance for in-house brand Barbara as misaligned targeting and neglected channel management, and planned a full online channel renewal. Drove a digital shift for a new 20s-30s target through shoot planning, SNS, and online-exclusive products.',
    },
    image: '/assets/works/vivien-main.png',
    works: ['/assets/works/vivien-online-1.png'],
    meta: {
      ko: ['온라인 상품·촬영·SNS·인플루언서 기획', '1개', '하반기 온라인 매출 31%↑ · 촬영 시간 2배 확보 · 운영 비용 절감 · 2030 신규 타겟 확장', '자사몰 · SNS'],
      en: ['Online Product · Shoot · SNS · Influencer Planning', '1 Brand', 'Online sales +31% (H2) · Shoot time doubled · Operating cost reduction · New 20s-30s target', 'Brand Site · SNS'],
    },
  },
  {
    number: '03',
    isMd: true,
    worksVertical: true,
    titleLines: [
      { ko: '포레(Poroe)',        en: 'Poroe',              italic: false },
      { ko: '브랜드 피벗', en: 'Brand Pivot', italic: true  },
    ],
    category: { ko: '브랜드 CEO · 기획', en: 'Brand CEO · Planning' },
    description: {
      ko: '니트웨어의 높은 MOQ와 긴 생산 주기로 재고와 현금 흐름 부담이 컸고, 카테고리 및 타겟 피벗으로 구조를 바꿨습니다. 다이마루 라인을 투입하고 키 큰 여성을 위한 코펜하겐 스타일로 브랜딩을 재수립했습니다.',
      en: 'High MOQ and long knitwear production cycles created inventory and cash flow pressure, which I addressed through a category and target pivot. I introduced the daimaru line and reset the brand around a Copenhagen aesthetic for tall women.',
    },
    image: '/assets/works/poroe-main.png',
    works: ['/assets/works/poroe-1.png', '/assets/works/poroe-2.png', '/assets/works/poroe-3.png', '/assets/works/poroe-4.png'],
    meta: {
      ko: ['브랜드 기획 · 소싱 · 재고 관리', '1개', '피벗 직후 매출 30%↑ · 재고 리스크 해소 · D2C 운영 안정화', '자사몰 · SNS'],
      en: ['Brand Planning · Sourcing · Inventory Management', '1 brand', 'Sales +30% post-pivot · Inventory risk resolved · D2C operations stabilised', 'Brand Site · SNS'],
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
    category:    { ko: '풀스택 기획 · 개발', en: 'Full-Stack Planning · Dev' },
    description: {
      ko: 'API 데이터 가공부터 AI 추천과 화면 노출까지 이어지는 추천 파이프라인을 구현하고 배포했습니다. 직접 만들며 추천 및 노출이 서비스에서 어떻게 설계되는지 구조를 파악했습니다.',
      en: 'Built and deployed the full recommendation pipeline, from API data processing through AI recommendations to on-screen exposure. By building it myself, I learned how recommendation and exposure are structured in a live service.',
    },
    intent: {
      ko: '기존 OTT는 성인 중심 설계로 어린이가 안전하게 이용하기 어렵습니다. AI 추천으로 연령에 맞는 콘텐츠를 자동 큐레이션하는 키즈 전용 미디어 환경을 기획 및 구현했습니다.',
      en: "Addressed safety concerns in adult-centric OTT platforms by designing a dedicated kids' media environment. Implemented AI-driven automation to curate age-appropriate content.",
    },
    image:       '/assets/project-rookiz-scene.jpg',
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
    category:    { ko: 'UX/UI 기획 · 설계', en: 'UX/UI Planning · Design' },
    description: {
      ko: '고객 여정·탐색·전환 흐름을 UX로 재설계하고 Figma 프로토타입으로 검증했습니다. 직접 기획하며 탐색 구조가 이탈 및 전환에 어떻게 영향을 주는지 확인했습니다.',
      en: 'Redesigned the customer journey, discovery, and conversion flows in UX and validated them with a Figma prototype. By planning it myself, I saw how discovery structure affects churn and conversion.',
    },
    intent: {
      ko: '음악은 방대하지만 탐색 흐름이 복잡해 원하는 곡을 찾기 어렵습니다. AI 추천과 상황 기반 큐레이션으로 능동적 탐색 없이도 최적의 음악을 만나는 경험을 설계했습니다.',
      en: 'Overcame navigation complexities in vast music libraries by designing an effortless discovery experience. Leveraged AI recommendations and context-based curation to deliver optimal tracks without active searching.',
    },
    image:       '/assets/project-spotify-scene.jpg',
    mobileImage: '/assets/project-spotify.png',
    embedUrl:    'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
    embedMask:   { top: 59, left: 152, width: 177, height: 375, borderRadius: 26 },
    meta: {
      ko: ['Figma · FigJam', 'Figma 프로토타입', '2주',     '100%', 'iOS · Android', '10화면 · AI 추천 · Dynamic TPO · AI DJ'],
      en: ['Figma · FigJam', 'Figma Prototype',  '2 weeks', '100%', 'iOS · Android', '10 screens · AI Rec · Dynamic TPO · AI DJ'],
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
    category:    { ko: 'UX/UI 기획 · 개발', en: 'UX/UI Planning · Dev' },
    description: {
      ko: '카테고리 및 구매 동선을 재설계하고 HTML, CSS, JavaScript로 반응형 웹에 직접 구현했습니다. 구현하며 이커머스 채널에서 발견 및 전환이 어떻게 설계되는지 구조를 파악했습니다.',
      en: 'Redesigned category and purchase flows and built them as a responsive web with HTML, CSS, and JavaScript. Through that build, I learned how discoverability and conversion are structured on an e-commerce channel.',
    },
    intent: {
      ko: '웹진과 쇼핑몰 콘텐츠가 혼재되어 사용자의 목적에 따른 탐색이 어렵습니다. 두 기능을 독립적으로 강화하고, 백화점 공간에서 영감을 얻은 [진입 → 욕구 → 구매 → 탐색] 흐름과 스타일 클러스터링으로 맞춤형 쇼핑 경험을 설계했습니다.',
      en: "Resolved navigation complexities caused by the overlap of webzine and e-commerce content. Engineered a tailored shopping experience through style clustering and a strategic flow inspired by department store layouts.",
    },
    image:       '/assets/project-musinsa-scene.png',
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
      <div className={`proj-modal${proj.isMd ? ' proj-modal--md' : ''}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        {proj.works && (
          <>
            <img src={proj.works[worksIdx]} alt={proj.titleLines[0][lang]} className={`proj-modal-image${proj.worksVertical ? ' proj-modal-image--vertical' : ''}`} />
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

          {proj.kpi && <p className="proj-kpi">{proj.kpi[lang]}</p>}

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
