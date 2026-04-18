import React from 'react';
import SocialLinks from '../SocialLinks/SocialLinks';
import './ContactInfoPanel.css';

const ITEMS = [
  { title: 'Call Me', desc: null, href: 'tel:01074087823', value: '+82 10 7408 7823' },
  { title: 'Write', desc: 'Or send a direct email at', href: 'mailto:cielle.sora@gmail.com', value: 'cielle.sora@gmail.com' },
];

const ContactInfoPanel = ({ variant = 'modal' }) => (
  <div className={`cip cip--${variant}`}>
    <p className="cip-tag">Get in Touch</p>
    <h2 className="cip-title">
      <strong>Let's work</strong>
      <em>together</em>
    </h2>
    <p className="cip-desc">
      새로운 기회와 협업에 대해 언제든 환영합니다.<br />
      편하게 연락주세요.
    </p>
    <ul className="cip-list">
      {ITEMS.map(({ title, desc, href, value }) => (
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

export default ContactInfoPanel;
