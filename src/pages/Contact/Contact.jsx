import VideoBackground from '../../components/VideoBackground/VideoBackground';
import useInView from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.css';

const CONTENT = {
  ko: {
    heading: ['연락', '주세요.'],
    desc: '새로운 기회와 협업에 대해 언제든 환영합니다.\n편하게 연락주세요.',
  },
  en: {
    heading: ['Get in', 'Touch'],
    desc: "I'm always open to new opportunities and collaborations.\nFeel free to reach out anytime.",
  },
};

const Contact = () => {
  const { lang } = useLanguage();
  const [ref, isVisible] = useInView();

  return (
    <section className={`contact-section ${isVisible ? 'is-visible' : ''}`} id="contact" ref={ref}>
      <VideoBackground
        videoOpacity={0.25}
        overlay="linear-gradient(190deg, rgba(30, 40, 35, 0.75) 0%, var(--color-dark) 100%)"
      />

      <div className="contact-inner">
        <h2 className="contact-title">
          <strong>{CONTENT[lang].heading[0]}</strong>
          <br />
          <em>{CONTENT[lang].heading[1]}</em>
        </h2>

        <p className="contact-desc">{CONTENT[lang].desc}</p>

        <div className="contact-info-bar">
          <a href="tel:+821074087823" className="contact-phone">+82 10 7408 7823</a>
          <div className="contact-vdivider" />
          <a href="mailto:cielle.sora@gmail.com" className="contact-email">cielle.sora@gmail.com</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
