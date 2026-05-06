import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const CONTENT = {
  ko: {
    sectionTag: '소개',
    bioLines: [
      '글로벌 역량에 6년의 실무를 더했습니다.',
      '데이터로 시장을 읽고 수익 구조를 설계하며,',
      '기술적 이해로 커머스 비즈니스를 완성합니다.',
    ],
    details: [
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
          { title: '패션코드 2023 F/W 참가',                                      subtitle: '한국콘텐츠진흥원(KOCCA) 주관', date: '2023. 03' },
        ],
      },
    ],
  },
  en: {
    sectionTag: 'About Me',
    bioLines: [
      'Global skills plus 6 years\' expertise.',
      'Market analysis and revenue structuring.',
      'Technical depth for commerce mastery.',
    ],
    details: [
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

const InfoBox = ({ profile, content, bioText }) => {
  const { lang } = useLanguage();
  const primaryName = lang === 'ko' ? profile.koName : profile.enName;

  return (
    <div className="about-item info-item">
      <div className="name-group">
        <h2 className="name-ko">{primaryName}</h2>
        <p className="name-en">{profile.enName}</p>
      </div>
      <p className="about-bio">{bioText}</p>
      <div className="detail-list">
        {content.details.map((detail, idx) => (
          <div className="detail-row" key={detail.label} style={{ animationDelay: `${0.5 + idx * 0.15}s` }}>
            <span className="detail-label">{detail.label}</span>
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

      <div className="about-wrapper page-container">
        <div className="about-tag">
          <SectionTag variant="light">{content.sectionTag}</SectionTag>
        </div>
        <div className="about-grid">
          <div className="about-item image-item">
            <div className="profile-frame">
              <img src={PROFILE.photo} alt="박서윤 프로필" className="profile-img" />
            </div>
          </div>

          <InfoBox profile={PROFILE} content={content} bioText={bioText} />
        </div>
      </div>
    </section>
  );
};

export default About;
