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
    intro: '기업 MD로 프로세스를 익히고, 브랜드를 직접 운영하며 시장에서 검증했습니다. 데이터 및 디지털 역량까지 더한 뒤, 패션 및 유통 기업의 상품기획 MD로 그 경험을 이어가고자 합니다.',
    bio: [
      '남영비비안에서 시즌당 총 500 SKU를 기획 및 운영했습니다. 3개국 수입 브랜드 포트폴리오를 재편 및 신규 런칭하고 온라인 채널 리뉴얼 기획으로 하반기 매출 전년 대비 유의미한 성장을 달성했습니다.',
      '포레에서 기획, 소싱, 재고, 마케팅 전 과정을 운영하며 피벗 후 매출 30%↑, D2C 안정화를 달성했습니다. 현장의 데이터 및 디지털 한계를 보완하기 위해 기술 역량을 쌓았고, 이를 상품기획 MD로 확장할 준비가 되어 있습니다.',
    ],
  },
  en: {
    sectionTag: 'About Me',
    statTag: 'Years of Experience',
    intro: 'I built corporate MD foundations, validated them by running my own brand in the market, and added data and digital skills. I am now looking to continue as a Product Planning MD in fashion and retail.',
    bio: [
      'At Namyoung Vivien, I planned and operated a total of 500 SKUs per season. I restructured and newly launched an import brand portfolio across three countries, and an online channel renewal drove meaningful year-over-year sales growth in H2.',
      'At Poroe, I ran planning, sourcing, inventory and marketing end-to-end, achieving +30% sales post-pivot and stabilising D2C operations. I built technical skills to address data and digital gaps in the field, and I am ready to extend that as a Product Planning MD.',
    ],
  },
};

const KEYWORDS = {
  ko: ['풀사이클 MD', '기획·바잉·운영', '데이터 기반', '글로벌 소싱', '매출 최적화'],
  en: ['Full-Cycle MD', 'Planning · Buying · Operations', 'Data-Driven', 'Global Sourcing', 'Sales Optimisation'],
};

const StatsBox = ({ isVisible, statTag }) => {
  const numRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    const TARGET = 5;
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

            <div className="keyword-strip" aria-hidden="true">
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
