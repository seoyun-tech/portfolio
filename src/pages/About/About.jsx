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
    bio: [
      '영국 NTU 패션 전공 기반의 트렌드 분석력을 바탕으로, 남영비비안에서 상품기획과 수입 브랜드 바잉 MD 업무를 동시에 전담했습니다. 인력 공백의 상황 속에서도 시즌 기획·생산 운영부터 해외 브랜드 바잉, 프리미엄 원단 소싱까지 담당하며 카테고리 효율을 극대화하는 멀티 플레이어로서 역량을 증명했습니다.',
      '실무의 전방위적 경험을 바탕으로 직접 브랜드를 론칭하여 디자인부터 자사몰 운영까지 비즈니스 사이클을 완주했습니다. 데이터 기반의 정교한 수요 예측으로 주요 카테고리 매출을 연평균 30% 이상 성장시켰으며, 숫자로 시장을 읽고 한계 없는 실행력으로 가치를 설계하는 6년 차 MD 박서윤입니다.',
    ],
  },
  en: {
    sectionTag: 'About Me',
    statTag: 'Years of Experience',
    bio: [
      'With trend analysis skills built on a Fashion Design degree from Nottingham Trent University (UK), I took on both product planning MD and import brand buying MD roles simultaneously at Namyoung Vivien. Despite working with limited headcount, I handled tasks spanning seasonal planning, production management, overseas brand buying, and premium fabric sourcing — proving my capabilities as a multi-player who maximises category efficiency.',
      'Drawing on that all-round hands-on experience, I went on to launch my own brand and completed the full business cycle — from design through to running my own online store. With precise, data-driven demand forecasting, I achieved average annual sales growth of over 30% across key categories. I am a 6-year MD who reads markets through data and designs value through limitless execution.',
    ],
  },
};

const KEYWORDS = ['풀사이클 MD', '기획·바잉 전담', '데이터 기반', '글로벌 소싱', '매출 최적화'];
const TRACK = [...KEYWORDS, ...KEYWORDS, ...KEYWORDS];

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
                {TRACK.map((kw, i) => (
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
