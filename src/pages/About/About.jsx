import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const CONTENT = {
  ko: {
    sectionTag: '소개',
    bioLines: [
      '현장에서 마주한 한계를 넘기 위해 코드를 익혔습니다.',
      '화려한 기술보다 해결하는 기술에 집중하며,',
      '팀의 병목을 뚫고 최선의 경로를 설계합니다.',
    ],
    details: [
      { label: '생년월일', value: '1994. 05. 11' },
      { label: '학력',     value: 'NTU International College(UK)\nArt & Design · 2015 – 2016\n\nNottingham Trent University(UK)\nFashion Degree(학사) · 2016 – 2019' },
    ],
  },
  en: {
    sectionTag: 'About Me',
    bioLines: [
      'I mastered coding to overcome the real-world challenges.',
      'Solving problems matters more than flashy tech.',
      'I clear bottlenecks and design the optimal route.',
    ],
    details: [
      { label: 'Birth', value: 'May 11, 1994' },
      { label: 'Education',     value: 'NTU International College(UK)\nArt & Design · 2015 – 2016\n\nNottingham Trent University(UK)\nFashion Degree(BA) · 2016 – 2019' },
    ],
  },
};

const PROFILE = {
  koName: '박서윤',
  enName: 'Park Seo-yun',
  photo:  '/assets/about-photo.svg',
};

const About = () => {
  const [ref, isVisible] = useInView();
  const { lang } = useLanguage();

  return (
    <section
      className={`about-section ${isVisible ? 'is-visible' : ''}`}
      id="about"
      ref={ref}
    >
      <VideoBackground videoOpacity={0.4} overlay="rgba(12, 42, 27, 0.2)" />

      <div className="about-content-wrapper">
        <div className="about-tag-mobile">
          <SectionTag variant="light">{CONTENT[lang].sectionTag}</SectionTag>
        </div>
        <div className="about-layout-grid">

          <div className="about-item image-item">
            <div className="profile-image-frame">
              <img src={PROFILE.photo} alt="박서윤 프로필" className="profile-image-main" />
            </div>
          </div>

          <InfoBox profile={PROFILE} content={CONTENT[lang]} sectionTag={CONTENT[lang].sectionTag} />

        </div>
      </div>
    </section>
  );
};

const InfoBox = ({ profile, content, sectionTag }) => (
  <div className="about-item info-item">
    <div className="about-me-tag">
      <SectionTag variant="light">{sectionTag}</SectionTag>
    </div>
    <div className="name-header-group">
      <h2 className="name-ko-title">{profile.koName}</h2>
      <p className="name-en-subtitle">{profile.enName}</p>
    </div>
    <p className="about-bio">{content.bioLines.join('\n')}</p>
    <div className="profile-data-list">
      {content.details.map((item, idx) => (
        <div className="data-row" key={idx} style={{ animationDelay: `${0.5 + idx * 0.15}s` }}>
          <span className="data-label">{item.label}</span>
          <span className="data-value">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default About;
