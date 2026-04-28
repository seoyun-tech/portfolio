import { useState } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
import useInView from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';
import './Experience.css';

const LABELS = {
  ko: { sectionTag: '경력' },
  en: { sectionTag: 'Work Experience' },
};

const EXPERIENCES = {
  ko: [
    {
      company: '공원더파크',
      role: '온라인쇼핑몰 운영',
      period: '2022.05 - 2025.10',
      duration: '3년 6개월',
      description: [
        '여성 의류 온라인 쇼핑몰 창업 및 운영',
        '제품 소싱, 마케팅 전략 수립 및 고객 데이터 분석',
        '사용자 구매 패턴 분석을 통한 웹사이트 최적화',
      ],
    },
    {
      company: '㈜남영비비안',
      role: '상품기획 MD',
      period: '2020.03 - 2022.05',
      duration: '2년 4개월',
      description: [
        '시즌 상품 기획 및 비주얼 촬영 디렉팅',
        '수입 브랜드 3개 총괄 바잉 및 운영 전담',
        '채널별 판매 전략 수립을 통한 목표 수익 및 매출 달성',
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
        "Founded and operated a women's clothing e-commerce business",
        'Oversaw product sourcing, devised marketing strategies, and analysed customer data',
        'Optimised the website through analysis of user purchasing behaviour',
      ],
    },
    {
      company: 'Namyoung Vivien Co., Ltd.',
      role: 'Product Planning MD',
      period: '2020.03 - 2022.05',
      duration: '2 yrs 4 mos',
      description: [
        'Led seasonal product planning and directed visual photoshoot production',
        'Held sole responsibility for the buying and operations of three international import brands',
        'Delivered revenue and sales targets through channel-specific trading strategies',
      ],
    },
  ],
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const { lang } = useLanguage();
  const [ref, isVisible] = useInView();
  const experiences = EXPERIENCES[lang];

  const handleTabClick = (index) => {
    setActiveTab(index);
    setAnimKey(k => k + 1);
  };

  return (
    <section className={`experience${isVisible ? ' is-visible' : ''}`} id="experience" ref={ref}>
      <div className="experience-container">
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
              <h3 className="position-title">{experiences[activeTab].role}</h3>
              <div className="period-info">
                <span>{experiences[activeTab].period}</span>
                <span className="duration">({experiences[activeTab].duration})</span>
              </div>
            </div>

            <ul className="description-list">
              {experiences[activeTab].description.map((item, idx) => (
                <li key={idx} className="description-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
