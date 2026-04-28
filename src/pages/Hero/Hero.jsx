import IconButton from '../../components/IconButton/IconButton';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

const CONTENT = {
  ko: {
    titleLines: ['현장의 데이터를 읽고,', '제품으로 답하는'],
    subtitle: { prefix: '기획자 ', strong: '박서윤', suffix: '입니다.' },
    contactBtn: '연락하기',
    resumeBtn:  '이력서',
  },
  en: {
    titleLines: ['Reading the field,', 'Answering through product.'],
    subtitle: { prefix: 'Product Strategist, ', strong: 'Seo-yun Park.', suffix: '' },
    contactBtn: 'Contact Me',
    resumeBtn:  'Resume',
  },
};

const Hero = ({ onOpenContact }) => {
  const { lang } = useLanguage();
  const c = CONTENT[lang];

  return (
    <section className="hero" id="home">
      <div className="hero-container page-container">

        <div className="hero-text-content">
          <h1 className="hero-title">
            {c.titleLines.map((line, i) => (
              <span key={i} className="title-line-wrap">
                <span className="title-line" style={{ animationDelay: `${0.1 + i * 0.15}s` }}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-subtitle">
            {c.subtitle.prefix}<strong>{c.subtitle.strong}</strong>{c.subtitle.suffix}
          </p>

          <div className="hero-cta-group">
            <IconButton icon="fa-solid fa-arrow-right" onClick={onOpenContact}>
              {c.contactBtn}
            </IconButton>
            <a href="/박서윤_이력서.pdf" className="hero-resume-button" target="_blank" rel="noreferrer">
              {c.resumeBtn}
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <img
            src="/assets/profile.svg"
            alt="기획자 박서윤 프로필"
            className="hero-profile-image"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
