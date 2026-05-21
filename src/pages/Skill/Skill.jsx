import { useRef, useState, useCallback, useEffect } from 'react';
import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import { useLanguage } from '../../context/LanguageContext';
import './Skill.css';

const SKILLS_DATA = ['ERP', 'Excel', 'Figma', 'Photoshop', 'Illustrator', 'HTML', 'CSS', 'JavaScript', 'React', 'GitHub'];


const SCROLL_AMOUNT = 300;

const LABELS = {
  ko: { sectionTag: '스킬', competencyTag: '역량' },
  en: { sectionTag: 'Skills', competencyTag: 'Competency' },
};

const COMPETENCIES = {
  ko: [
    {
      label: '상품 기획 및 운영 전략',
      description: [
        '시즌 콘셉트 수립 및 라인업 구성',
        '생산 일정 관리 및 납기 컨트롤',
        '카테고리별 매출 비중 전략 수립 및 SKU 효율 최적화',
      ],
    },
    {
      label: '글로벌 바잉 및 소싱',
      description: [
        '수입 브랜드 발굴, 선정, 계약 운영',
        '해외 오더 및 재고 관리',
        '프리미엄 원단 소싱 및 샘플 검토',
      ],
    },
    {
      label: '데이터 기반 비즈니스 분석',
      description: [
        '판매 데이터 및 적중률 분석을 통한 상품 비중 재설계',
        '수요 예측 기반의 적정 발주량 산정 및 재고 관리',
        '이커머스 채널별 구매 전환율 및 고객 유입 경로 분석',
      ],
    },
  ],
  en: [
    {
      label: 'Product Planning',
      description: [
        'Seasonal concept development and lineup composition',
        'Production schedule management and lead time control',
        'Category sales mix strategy and SKU efficiency optimisation',
      ],
    },
    {
      label: 'Global Buying',
      description: [
        'Scouting, selecting and contracting import brands',
        'Overseas ordering and inventory management',
        'Premium fabric sourcing and sample review',
      ],
    },
    {
      label: 'Data-Driven Business Analysis',
      description: [
        'Product mix redesign through sales data and sell-through rate analysis',
        'Demand forecasting for optimal order quantity planning and inventory management',
        'Conversion rate and acquisition channel analysis across e-commerce platforms',
      ],
    },
  ],
};


const DESCRIPTION = {
  ko: (
    <p>
      <strong>기업 MD로 프로세스를 쌓고, 직접 브랜드를 운영하며 시장 전체를 체득했습니다. </strong>
      <span className="text-dim">현장에서 마주한 데이터와 디지털 채널의 한계를 스스로 돌파하기 위해 코딩과 AI 역량을 직접 익혔고, </span>
      <span className="text-dim">이제 풀사이클 MD 경험과 기술 역량을 바탕으로 조직 안에서 데이터로 시장을 읽고 매출 구조를 설계합니다.</span>
    </p>
  ),
  en: (
    <p>
      <strong>I built my MD foundations in a corporate setting, then validated my understanding of the full market cycle by running my own brand. </strong>
      <span className="text-dim">To break through the limits I encountered with data and digital channels in the field, I acquired coding and AI skills myself. </span>
      <span className="text-dim">Now, with full-cycle MD experience and technical capability, I design data-driven sales structures within organisational settings.</span>
    </p>
  ),
};


const Skill = () => {
  const [sectionRef, isVisible] = useInView();
  const carouselRef = useRef(null);
  const { lang } = useLanguage();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const competencies = COMPETENCIES[lang];
  const activeItem = competencies[activeTab];

  const handleTabClick = (index) => {
    setActiveTab(index);
    setAnimKey(k => k + 1);
  };

  useEffect(() => { setActiveTab(0); }, [lang]);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => { checkScroll(); }, [checkScroll]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction === 'next' ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="skill"
      className={`skill-section${isVisible ? ' is-visible' : ''}`}
    >
      <div className="skill-container page-container">

        <div className="skill-header">
          <SectionTag>{LABELS[lang].sectionTag}</SectionTag>

          <div className="skill-description">
            {DESCRIPTION[lang]}
          </div>
        </div>

        <div className={`skill-carousel-wrapper${!canScrollLeft ? ' scroll-start' : !canScrollRight ? ' scroll-end' : ' scroll-middle'}`}>
          <div className="skill-carousel" ref={carouselRef} onScroll={checkScroll}>
            {SKILLS_DATA.map((name, index) => (
              <div
                key={name}
                className="skill-chip"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button
            className="control-btn prev"
            onClick={() => scroll('prev')}
            disabled={!canScrollLeft}
            aria-label="이전"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className="control-btn next"
            onClick={() => scroll('next')}
            disabled={!canScrollRight}
            aria-label="다음"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className="competency-section-tag">
          <SectionTag>{LABELS[lang].competencyTag}</SectionTag>
        </div>

        <div className="competency-tabs">
          <nav className="tabs-nav">
            {competencies.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`tab-item${activeTab === index ? ' active' : ''}`}
                onClick={() => handleTabClick(index)}
                aria-selected={activeTab === index}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="competency-details" key={animKey}>
            <ul className="description-list">
              {activeItem.description.map((item, idx) => (
                <li key={idx} className="description-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

const ArrowIcon = ({ direction }) => (
  <i className={direction === 'left' ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right'} />
);

export default Skill;
