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
    intro: '영국 NTU 패션 전공 기반의 트렌드 감각과 남영비비안에서의 실무 경험을 바탕으로 비즈니스의 전 과정을 리딩합니다.',
    bio: [
      '남영비비안에서 상품기획과 수입 바잉을 전담하며, 기획·생산부터 원단 소싱까지 카테고리 전반의 효율을 극대화했습니다. 특히 조직 리소스의 공백을 기회로 삼아 멀티 플레이어로서의 역량을 증명해왔습니다.',
      '나아가 개인 브랜드 론칭을 통해 디자인부터 자사몰 운영까지 비즈니스 사이클을 완주했습니다. 데이터 기반의 정교한 수요 예측으로 주요 카테고리 매출을 연평균 30% 이상 성장시켰으며, 숫자로 시장을 읽고 한계 없는 실행력으로 가치를 설계합니다.',
    ],
  },
  en: {
    sectionTag: 'About Me',
    statTag: 'Years of Experience',
    intro: 'Drawing on trend sensibility from a Fashion Design degree at Nottingham Trent University and hands-on experience at Namyoung Vivien, I lead the full business cycle end to end.',
    bio: [
      'At Namyoung Vivien, I took sole charge of product planning and import buying, maximising category-wide efficiency from planning and production through to fabric sourcing. I consistently turned organisational resource gaps into opportunities, proving my value as a versatile multi-player.',
      'Going further, I launched my own brand and completed the full business cycle from design through to running my own online store. With precise, data-driven demand forecasting, I grew key category sales by over 30% year on year, reading markets through data and designing value through limitless execution.',
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
