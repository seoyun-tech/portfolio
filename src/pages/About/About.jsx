import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const CONTENT = {
  ko: {
    sectionTag: '소개',
    bioLines: [
      '현장의 한계를 넘기 위해 코드를 익혔습니다.',
      '화려한 기술보다 해결하는 기술에 집중하며,',
      '팀의 병목을 뚫고 최선의 경로를 설계합니다.',
    ],
    details: [
      { label: '생년월일', value: '1994. 05. 11' },
      {
        label: '학력',
        items: [
          { title: 'NTU International College(UK)',   subtitle: 'Art & Design',         date: '2015 – 2016' },
          { title: 'Nottingham Trent University(UK)', subtitle: 'Fashion Degree(학사)', date: '2016 – 2019' },
        ],
      },
      {
        label: '수상 및 활동',
        items: [
          { title: 'River Island 2019 Menswear Collection Concept Competition', subtitle: '전체 우승',                    date: '2018. 05' },
          { title: '패션코드 2023 F/W 참가',                                      subtitle: '한국콘텐츠진흥원(KOCCA) 주관', date: '2022. 03' },
        ],
      },
    ],
  },
  en: {
    sectionTag: 'About Me',
    bioLines: [
      'I learned to code to push past the limits I faced on the ground.',
      'I focus on the craft of solving problems, not on flashy tech.',
      'I clear bottlenecks and design the best path forward.',
    ],
    details: [
      { label: 'Birth', value: 'May 11, 1994' },
      {
        label: 'Education',
        items: [
          { title: 'NTU International College(UK)',   subtitle: 'Art & Design',       date: '2015 – 2016' },
          { title: 'Nottingham Trent University(UK)', subtitle: 'Fashion Degree(BA)', date: '2016 – 2019' },
        ],
      },
      {
        label: 'Awards & Activities',
        items: [
          { title: 'River Island 2019 Menswear Collection Concept Competition', subtitle: '1st Prize',     date: 'May 2018' },
          { title: 'Fashion Code 2023 F/W',                                      subtitle: 'Hosted by KOCCA', date: 'Mar 2022' },
        ],
      },
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
  const content = CONTENT[lang];
  const bioText = content.bioLines.join('\n');

  return (
    <section
      className={`about-section${isVisible ? ' is-visible' : ''}`}
      id="about"
      ref={ref}
    >
      <VideoBackground videoOpacity={0.4} overlay="rgba(12, 42, 27, 0.2)" />

      <div className="about-wrapper">
        <div className="about-tag">
          <SectionTag variant="light">{content.sectionTag}</SectionTag>
        </div>
        <div className="about-grid">
          <div className="about-item image-item">
            <div className="profile-frame">
              <img src={PROFILE.photo} alt="박서윤 프로필" className="profile-img" />
            </div>
            <p className="about-bio bio-desktop">{bioText}</p>
          </div>

          <InfoBox profile={PROFILE} content={content} bioText={bioText} />
        </div>
      </div>
    </section>
  );
};

const InfoBox = ({ profile, content, bioText }) => {
  const { lang } = useLanguage();
  const primaryName = lang === 'ko' ? profile.koName : profile.enName;

  return (
    <div className="about-item info-item">
      <div className="name-group">
        <h2 className="name-ko">{primaryName}</h2>
        <p className="name-en">{profile.enName}</p>
      </div>
      <p className="about-bio bio-mobile">{bioText}</p>
      <div className="detail-list">
        {content.details.map((detail, idx) => (
          <div className="detail-row" key={detail.label} style={{ animationDelay: `${0.5 + idx * 0.15}s` }}>
            <span className="detail-label">{detail.label}</span>
            {detail.value && <span className="detail-value">{detail.value}</span>}
            {detail.items && (
              <div className="detail-items">
                {detail.items.map((item, i) => (
                  <div className="detail-item" key={i}>
                    <div className="detail-head">
                      <span className="detail-title">{item.title}</span>
                      <span className="detail-meta">{item.date}</span>
                    </div>
                    <span className="detail-meta">{item.subtitle}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
