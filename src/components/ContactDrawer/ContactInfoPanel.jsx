import SocialLinks from '../SocialLinks/SocialLinks';
import { useLanguage } from '../../context/LanguageContext';
import { CONTACT_PHONE, CONTACT_EMAIL } from '../../constants/contact';
import './ContactInfoPanel.css';

const CONTENT = {
  ko: {
    tag: '연락하기',
    title: ['새로운 기회를', '기다립니다.'],
    desc: '새로운 기회와 협업에 대해 언제든 환영합니다.\n편하게 연락주세요.',
    items: [
      { title: '전화',   desc: null,                           ...CONTACT_PHONE },
      { title: '이메일', desc: '이메일로 직접 보내실 수도 있어요.', ...CONTACT_EMAIL },
    ],
  },
  en: {
    tag: 'Get in Touch',
    title: ["Let's work", 'together'],
    desc: 'I am always open to new opportunities and collaborations.\nPlease feel free to get in touch.',
    items: [
      { title: 'Phone', desc: null,                        ...CONTACT_PHONE },
      { title: 'Email', desc: 'Or send a direct email at', ...CONTACT_EMAIL },
    ],
  },
};

const ContactInfoPanel = ({ variant = 'modal' }) => {
  const { lang } = useLanguage();
  const c = CONTENT[lang];

  return (
    <div className={`cip cip--${variant}`}>
      <p className="cip-tag">{c.tag}</p>
      <h2 className="cip-title">
        <strong>{c.title[0]}</strong>
        <em>{c.title[1]}</em>
      </h2>
      <p className="cip-desc">{c.desc}</p>
      <ul className="cip-list">
        {c.items.map(({ title, desc, href, value }) => (
          <li key={title} className="cip-item">
            <em className="cip-item-title">{title}</em>
            {desc && <p className="cip-item-desc">{desc}</p>}
            <a href={href} className="cip-item-value">{value}</a>
          </li>
        ))}
      </ul>
      <SocialLinks className="cip-social" />
    </div>
  );
};

export default ContactInfoPanel;
