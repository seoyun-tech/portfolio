import { useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const CONTENT = {
  ko: {
    sectionTag: '소개',
    statTag: '년간 실무 경력',
    intro: '영국 NTU 패션 전공의 트렌드 시각과 남영비비안에서의 실무를 기반으로 브랜드의 수익 구조와 공급망 전체를 주도적으로 핸들링합니다.',
    bio: [
      '남영비비안 재직 당시, 카테고리별 효율 분석을 통해 SKU 운영을 최적화하고 수입 바잉 프로세스를 내재화하여 영업 이익률을 방어했습니다. 특히 조직 재편기 속에서 TNA 관리와 원단 소싱 매뉴얼을 정립하며 실무 운영의 안정성을 확보한 경험이 있습니다.',
      '나아가 개인 브랜드를 운영하며 재고 회전율을 고려한 카테고리 믹스 전략과 니치 마켓 피벗을 통해 비즈니스 모델의 수익성을 개선했습니다. 이제는 현장 감각을 넘어 데이터 분석과 디지털 채널 운영까지 직접 다루는 MD로서, 매출 구조를 시스템적으로 설계합니다.',
    ],
  },
  en: {
    sectionTag: 'About Me',
    statTag: 'Years of Experience',
    intro: 'Built on the trend intelligence of my Fashion degree at NTU and hands-on experience at Namyoung Vivien, I take full ownership of a brand\'s revenue structure and its entire supply chain.',
    bio: [
      'At Namyoung Vivien, I optimised SKU operations through category efficiency analysis and internalised the import buying process to protect operating profit margins. During a period of organisational restructuring, I established TNA management protocols and a fabric sourcing manual, securing stability across day-to-day operations.',
      'Beyond that, I ran my own brand, improving business profitability through an inventory-conscious category mix strategy and a pivot into niche markets. Now, as an MD who directly handles data analysis and digital channel operations beyond field experience, I design sales structures in a systematic manner.',
    ],
  },
};

const KEYWORDS = {
  ko: ['풀사이클 MD', '기획·바잉 전담', '데이터 기반', '글로벌 소싱', '매출 최적화'],
  en: ['Full-Cycle MD', 'Planning & Buying', 'Data-Driven', 'Global Sourcing', 'Sales Optimisation'],
};

const StatsBox = ({ isVisible, statTag }) => {
  const numRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    const TARGET = 6;
    const DURATION = 1400;
    const DELAY = 400;

    timerRef.current = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (numRef.current) numRef.current.textContent = Math.floor(eased * TARGET);
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, DELAY);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  return (
    <div className="stat-col">
      <div className="stat-number">
        <span ref={numRef} className="stat-digit">0</span><span className="stat-plus">+</span>
      </div>
      <SectionTag variant="light">{statTag}</SectionTag>
    </div>
  );
};

const About = () => {
  const [ref, isVisible] = useInView();
  const { lang } = useLanguage();
  const c = CONTENT[lang];
  const track = [...KEYWORDS[lang], ...KEYWORDS[lang], ...KEYWORDS[lang]];

  return (
    <section
      className={`about-section${isVisible ? ' is-visible' : ''}`}
      id="about"
      ref={ref}
    >
      <VideoBackground videoOpacity={0.4} overlay="var(--color-primary-25)" />

      <div className="about-wrapper page-container">
        <div className="about-grid">

          <StatsBox isVisible={isVisible} statTag={c.statTag} />

          <div className="content-col">
            <div className="about-tag">
              <SectionTag variant="light">{c.sectionTag}</SectionTag>
            </div>
            <div className="about-bio">
              {c.intro && (
                <p className="about-intro"><strong>{c.intro}</strong></p>
              )}
              {c.bio.map((para, i) => {
                if (lang === 'ko' && para.includes('박서윤')) {
                  const parts = para.split('박서윤');
                  return <p key={i}>{parts[0]}<strong>박서윤</strong>{parts[1]}</p>;
                }
                return <p key={i}>{para}</p>;
              })}
            </div>

            <div className="keyword-strip">
              <div className="keyword-track">
                {track.map((kw, i) => (
                  <span key={i} className="keyword-item">{kw}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
