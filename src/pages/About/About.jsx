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
    intro: '기업 MD로 프로세스를 익히고, 직접 브랜드를 운영하며 시장 전체를 검증한 뒤, 데이터와 기술까지 갖춘 MD로 진화했습니다. 이제 그 경험을 조직의 규모와 결합해 더 큰 임팩트를 만들 준비가 되어 있습니다.',
    bio: [
      '남영비비안에서 시즌당 약 350 SKU를 기획·운영하며 상품 기획의 프로세스와 기초를 체득했습니다. 3개국 수입 브랜드 바잉을 내재화해 목표 대비 108%를 초과 달성하고, 온라인 채널 리뉴얼로 하반기 매출 31%↑를 이끌면서, 기획 의도를 직접 시장에서 검증하고 싶다는 확신을 갖게 됐습니다.',
      '이후 직접 브랜드를 런칭해 기획·소싱·재고·마케팅 전 과정을 단독으로 책임지며 피벗 직후 매출 30%↑와 D2C 운영 안정화를 달성했습니다. 현장에서 데이터와 디지털 채널의 한계를 체감한 뒤 6개월간 코딩과 AI 역량을 직접 쌓았고, 이제는 그 모든 경험을 조직의 리소스와 결합해 더 큰 규모에서 브랜드를 설계할 준비가 되어 있습니다.',
    ],
  },
  en: {
    sectionTag: 'About Me',
    statTag: 'Years of Experience',
    intro: 'I built my MD foundations in a corporate setting, validated my understanding of the full market cycle by running my own brand, and then acquired data and technical skills. I am now ready to combine all of that experience with organisational resources to create a bigger impact.',
    bio: [
      'At Namyoung Vivien, I planned and managed approximately 350 SKUs per season, building solid foundations in product planning processes. Internalising the buying process for brands across 3 countries — exceeding targets by 108% — and leading an online channel rebuild that drove H2 sales +31% gave me the conviction to test my planning judgement directly against the market.',
      'I then launched my own brand, taking sole responsibility for the full cycle — planning, sourcing, inventory and marketing — and achieved +30% sales immediately post-pivot alongside D2C operations stabilisation. After experiencing firsthand the limits of data and digital channels on the ground, I spent 6 months acquiring coding and AI skills. I am now ready to combine all of that with organisational scale to design brand strategies that deliver measurably larger impact.',
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
