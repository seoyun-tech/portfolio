import { useState } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
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
      company: '㈜훼미모드',
      role: '상품기획 MD',
      period: '2020.04 - 2022.05',
      duration: '2년 2개월',
      description: [
        '시즌 상품 기획 및 비주얼 촬영 디렉팅',
        '수입 브랜드 3개 총괄 바잉 및 운영 전담',
      ],
    },
    {
      company: '㈜남영비비안',
      role: '온라인 MD',
      period: '2020.03 - 2020.04',
      duration: '2개월',
      description: [
        '이커머스 채널 런칭 및 프로모션 지원',
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
        'Founded and operated a women\'s fashion brand',
        'Managed the full cycle from garment design and production to marketing',
        'Optimised the online store based on user data and purchase patterns',
      ],
    },
    {
      company: 'Femimode Co., Ltd.',
      role: 'Product Planning MD',
      period: '2020.04 - 2022.05',
      duration: '2 yrs 2 mos',
      description: [
        'Managed seasonal product planning and directed visual photoshoot production',
        'Led the end-to-end buying and operations for three international brands',
      ],
    },
    {
      company: 'Vivien Co., Ltd.',
      role: 'Online MD',
      period: '2020.03 - 2020.04',
      duration: '2 mos',
      description: [
        'Supported the launch of new e-commerce channels and seasonal promotions',
      ],
    },
  ],
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const { lang } = useLanguage();
  const experiences = EXPERIENCES[lang];

  const handleTabClick = (index) => {
    setActiveTab(index);
    setAnimKey(k => k + 1);
  };

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <SectionTag>{LABELS[lang].sectionTag}</SectionTag>

        <div className="experience-tabs">

          <div className="tabs-navigation">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`tab-item ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <span className="tab-label">{exp.company}</span>
              </div>
            ))}
          </div>

          <div className="tabs-content">
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
      </div>
    </section>
  );
};

export default Experience;
