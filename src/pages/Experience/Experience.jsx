import React, { useState } from 'react';
import SectionTag from '../../components/SectionTag/SectionTag';
import IconCircle from '../../components/IconCircle/IconCircle';
import { useLanguage } from '../../context/LanguageContext';
import './Experience.css';

const EXPERIENCES = {
  ko: [
    {
      company: '공원더파크',
      role: '온라인쇼핑몰 대표',
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
      role: 'Online Shopping Mall CEO',
      period: '2022.05 - 2025.10',
      duration: '3 yrs 6 mon',
      description: [
        'Founded and operated a women\'s clothing online shopping mall',
        'Product sourcing, marketing strategy planning and customer data analysis',
        'Website optimization through user purchase pattern analysis',
      ],
    },
    {
      company: 'Femimode Co., Ltd.',
      role: 'Merchandise Planner MD',
      period: '2020.04 - 2022.05',
      duration: '2 yrs 2 mon',
      description: [
        'Seasonal product planning and visual shoot directing',
        'Responsible for overall buying and operations of 3 imported brands',
      ],
    },
    {
      company: 'Vivien Co., Ltd.',
      role: 'Online MD',
      period: '2020.03 - 2020.04',
      duration: '2 mon',
      description: [
        'E-commerce channel launch and promotion support',
      ],
    },
  ],
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { lang } = useLanguage();
  const experiences = EXPERIENCES[lang];

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <div className="experience-tabs">

          <div className="tabs-navigation">
            <div className="tabs-list">
              {experiences.slice(0, 4).map((exp, index) => (
                <div
                  key={index}
                  className={`tab-item ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="tab-label">{exp.company}</span>
                </div>
              ))}
              <div className="tabs-more">
                <div className="tabs-more-inner">
                  {experiences.slice(4).map((exp, index) => (
                    <div
                      key={index + 4}
                      className={`tab-item ${activeTab === index + 4 ? 'active' : ''}`}
                      onClick={() => setActiveTab(index + 4)}
                    >
                      <span className="tab-label">{exp.company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tabs-content">
            <div className="experience-details">

              <SectionTag>Work Experience</SectionTag>

              <div className="position-content">
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

                <div className="learn-more-btn">
                  <span className="learn-more-text">Learn more</span>
                  <IconCircle>
                    <i className="fa-solid fa-plus" style={{ color: 'var(--color-primary)', fontSize: '12px' }} />
                  </IconCircle>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
