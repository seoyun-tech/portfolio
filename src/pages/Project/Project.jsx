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
    tabIt: '디지털 역량',
    tabItDesc: '현장 MD로서 데이터와 디지털 채널의 한계를 직접 경험하고, 이를 해결하기 위해 기술을 익혔습니다. 개발 역량 자체가 목적이 아닌, MD가 플랫폼 로직과 이커머스 구조를 직접 이해하고 설계할 수 있음을 보여주는 프로젝트들입니다.',
  },
  en: {
    learnMore: 'Learn more',
    tabMd: 'Fashion MD',
    tabIt: 'Digital Skills',
    tabItDesc: 'As a field MD, I encountered firsthand the limits of relying on others to interpret data and manage digital channels — so I learned to build. These projects are not a developer\'s portfolio. They demonstrate an MD who can understand platform logic, work directly with data, and design digital commerce experiences from the inside.',
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
    titleLines: [
      { ko: '㈜남영비비안',         en: 'Namyoung Vivien',          italic: false },
      { ko: '온라인 채널 리빌딩',   en: 'Online Channel Rebuild',   italic: true  },
    ],
    category: { ko: '온라인 MD · 마케팅', en: 'Online MD · Marketing' },
    description: {
      ko: '자사 브랜드 \'바바라\'의 온라인 부진 원인을 타겟 불일치와 채널 운영 부재로 정의하고 이를 전면 리뉴얼했습니다. 촬영 프로세스 효율화로 리소스를 2배 확보해 브랜드 컨셉을 재정립했으며, SNS 최적화 및 온라인 전용 상품 기획으로 2030 신규 타겟층을 겨냥한 디지털 전환을 완수해 하반기 온라인 매출 31%↑를 달성했습니다.',
      en: 'Identified misaligned targeting and neglected channel management as the root causes of poor online performance for in-house brand Barbara, and executed a full-scale renewal. Doubling shoot resources through process efficiency redefined the brand concept, and SNS optimisation alongside online-exclusive product planning completed the digital transformation — driving online sales +31% in H2 with a new 20s–30s target audience.',
    },
    image: '/assets/works/vivien-main.png',
    works: ['/assets/works/vivien-online-1.png', '/assets/works/vivien-online-2.png'],
    meta: {
      ko: ['온라인 MD · SNS · 인플루언서 마케팅', '1개', '하반기 온라인 매출 31%↑ · 촬영 시간 2배 확보 · 운영 비용 절감 · 2030 신규 타겟 확장', '자사몰 · SNS'],
      en: ['Online MD · SNS · Influencer Marketing', '1 Brand', 'Online sales +31% (H2) · Shoot time doubled · Operating cost reduction · New 20s–30s target', 'Brand Site · SNS'],
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
      ko: '매출 데이터 분석을 기반으로 기존 브랜드 포트폴리오를 재편하고, 프랑스(샹텔)·미국(에버제이)·벨기에(플루토) 3개국 신규 브랜드를 바잉 기획했습니다. 브랜드별 가격 전략을 차등 운영하는 편집샵형 멀티 브랜드 구성을 구현해, 전년 대비 매출 8.2%↑와 목표 대비 108% 초과 달성을 이끌었습니다.',
      en: 'Restructured the existing brand portfolio through sales data analysis, then planned the buying of three new brands across France (Chantel), the US (Everjay) and Belgium (Pluto). Implementing a curated multi-brand structure with differentiated pricing strategies by brand drove sales +8.2% YoY and 108% of target achieved.',
    },
    image: '/assets/works/vivien-buying-main.png',
    works: ['/assets/works/vivien-buying-1.png'],
    meta: {
      ko: ['바잉 MD · 글로벌 소싱 · 재고 관리', '3개국 4개', '전년 대비 매출 8.2%↑ · 목표 대비 108% 초과 달성 · 판매율: 샹텔 52% · 에버제이 39% · 플루토 64%', '백화점'],
      en: ['Buying MD · Global Sourcing · Inventory', '4 Brands / 3 Countries', 'Sales +8.2% YoY · 108% of target achieved · Sell-through: Chantel 52% · Everjay 39% · Pluto 64%', 'Dept. Store'],
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
      ko: '기업 MD로서 쌓은 기획 역량을 직접 시장에서 검증하기 위해 브랜드를 런칭했습니다. 니트웨어의 높은 MOQ와 긴 생산 주기에 따른 재고 부담 및 현금 흐름 리스크를 카테고리 믹스와 타겟 피벗으로 해결했습니다. 생산 유연성이 높은 다이마루 라인을 투입해 고정비를 완화했으며, 키 큰 여성을 위한 코펜하겐 스타일로 브랜딩을 재수립해 피벗 직후 매출 30%↑와 D2C 운영 안정화를 달성했습니다.',
      en: 'Launched the brand to validate the planning capabilities built during my corporate MD career directly against the market. Resolved inventory burden and cash flow risk from high MOQ and lengthy knitwear production cycles through a category mix and target pivot. Introducing the daimaru line eased fixed cost pressure, and reestablishing the brand around the Copenhagen aesthetic for tall women delivered +30% sales immediately post-pivot alongside D2C operations stabilisation.',
    },
    image: '/assets/works/poroe-main.png',
    works: ['/assets/works/poroe-1.png', '/assets/works/poroe-2.png', '/assets/works/poroe-3.png'],
    meta: {
      ko: ['브랜드 기획 · 상품 구성비 전략 · 직접 운영', '2개', '피벗 직후 매출 30%↑ · 재고 리스크 해소 · D2C 운영 안정화', '자사몰 · SNS'],
      en: ['Brand Planning · Category Mix Strategy · Direct Operations', '2 Brands', 'Sales +30% post-pivot · Inventory risk resolved · D2C operations stabilised', 'Brand Site · SNS'],
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
    category:    { ko: 'MD 관점의 추천 로직 구현', en: 'Recommendation Logic from an MD Lens' },
    description: {
      ko: '이커머스 플랫폼의 추천 알고리즘이 MD의 기획 의도와 어떻게 연결되는지 이해하기 위해, API 데이터 가공부터 AI 추천 엔진까지 직접 구현했습니다. 플랫폼 로직을 체득한 MD는 상품 구성과 노출 전략을 데이터 기반으로 더 정확하게 설계할 수 있습니다.',
      en: 'To understand how a platform\'s recommendation algorithm connects to an MD\'s planning intent, I built the full pipeline — from API data processing to AI engine. An MD who understands platform logic can design product composition and exposure strategy with far greater precision.',
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
    category:    { ko: '고객 탐색 흐름 · 전환율 설계', en: 'Discovery Flow & Conversion Design' },
    description: {
      ko: '방대한 상품 데이터 속에서 고객 이탈을 막는 탐색 흐름 설계는 패션 이커머스 MD에게도 직결되는 역량입니다. MD 관점에서 고객 여정과 구매 전환율을 기획하는 방식을 UX 설계로 직접 구현했습니다.',
      en: 'Designing discovery flows that prevent churn within vast product data is a capability that translates directly to fashion e-commerce MD work. I applied an MD\'s lens to customer journey and conversion rate planning, implementing it through UX design.',
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
    category:    { ko: '상품 발견성 · 구매 동선 설계', en: 'Product Discoverability & Purchase Flow' },
    description: {
      ko: '패션 이커머스에서 콘텐츠와 커머스의 혼재는 상품 발견율과 전환율을 모두 떨어뜨립니다. MD 관점에서 카테고리 동선과 구매 흐름을 재설계하고, 실제 반응형 웹으로 직접 구현하며 이커머스 채널 구조를 체득했습니다.',
      en: 'In fashion e-commerce, mixing content and commerce hurts both product discoverability and conversion. I redesigned the category flow and purchase path from an MD\'s perspective, then built it as a responsive web to internalise the structure of e-commerce channel design.',
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
          {activeTab === 'it' && (
            <p className="project-tab-desc">{LABELS[lang].tabItDesc}</p>
          )}
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
