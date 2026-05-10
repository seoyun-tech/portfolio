import { useRef, useState, useCallback, useEffect } from 'react';
import useInView from '../../hooks/useInView';
import IconCircle from '../../components/IconCircle/IconCircle';
import SectionTag from '../../components/SectionTag/SectionTag';
import { useLanguage } from '../../context/LanguageContext';
import './Skill.css';

const SKILLS_DATA = ['ERP', 'Excel', 'HTML', 'CSS', 'JavaScript', 'React', 'GitHub', 'Figma', 'Photoshop', 'Illustrator'];


const SCROLL_AMOUNT = 300;

const LABELS = {
  ko: { sectionTag: '스킬', competencyTag: '역량', learnMore: '자세히 보기' },
  en: { sectionTag: 'Skills', competencyTag: 'Competency', learnMore: 'Learn more' },
};

const COMPETENCIES = {
  ko: [
    {
      label: '기획',
      description: [
        '시즌 콘셉트 기획 및 라인업 구성',
        '생산 일정·납기 관리',
        '상품 비중 전략 수립 및 SKU 관리',
        '브랜드 피벗 전략 수립',
      ],
    },
    {
      label: '소싱',
      description: [
        '수입 브랜드 발굴·선정·계약 운영',
        '해외 발주 및 재고 관리',
        '프리미엄 원단 소싱 및 샘플 검토',
        '글로벌 트렌드 반영 바잉 전략 수립',
      ],
    },
    {
      label: '분석',
      description: [
        '판매 데이터 분석 및 상품 비중 기획',
        '온라인 채널 데이터 분석',
        '수요 예측 기반 발주량 산정',
        '구매 전환율 분석',
      ],
    },
  ],
  en: [
    {
      label: 'Planning',
      description: [
        'Seasonal concept planning & lineup composition',
        'Production scheduling & lead time management',
        'Product mix strategy & SKU management',
        'Brand pivot strategy planning',
      ],
    },
    {
      label: 'Sourcing',
      description: [
        'Scouting, selecting & contracting import brands',
        'Overseas ordering & inventory management',
        'Premium fabric sourcing & sample review',
        'Buying strategy aligned with global trends',
      ],
    },
    {
      label: 'Analysis',
      description: [
        'Sales data analysis & product mix planning',
        'Online channel data analysis',
        'Demand forecasting for order quantity optimisation',
        'Conversion rate analysis',
      ],
    },
  ],
};


const DESCRIPTION = {
  ko: (
    <p>
      <strong>영국 NTU 졸업 후 정통 언더웨어 브랜드 MD와 이커머스 창업을 거치며 비즈니스 전 과정을 주도했습니다. </strong>
      <span className="text-dim">현장에서 마주한 한계를 기술력으로 돌파하고자 코딩을 익혔고, </span>
      <span className="text-dim">이제 데이터와 로직을 바탕으로 시장의 문제를 실효적인 기획으로 풀어냅니다.</span>
    </p>
  ),
  en: (
    <p>
      <strong>Following graduation from NTU in the UK, I led the full scope of business operations through an MD role at a major corporation and an e-commerce venture. </strong>
      <span className="text-dim">I took up coding to overcome the limitations I encountered on the ground. </span>
      <span className="text-dim">I now draw on data and logic to shape market challenges into considered, actionable plans.</span>
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
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className="control-btn next"
            onClick={() => scroll('next')}
            disabled={!canScrollRight}
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
              <div
                key={index}
                className={`tab-item${activeTab === index ? ' active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {item.label}
              </div>
            ))}
          </nav>

          <div className="competency-details" key={animKey}>
            <ul className="description-list">
              {activeItem.description.map((item, idx) => (
                <li key={idx} className="description-item">{item}</li>
              ))}
            </ul>
            <button className="learn-more-btn">
              <span className="learn-more-text">{LABELS[lang].learnMore}</span>
              <IconCircle>
                <i className="fa-solid fa-plus" style={{ fontSize: '12px' }} />
              </IconCircle>
            </button>
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
