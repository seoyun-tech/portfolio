import { SOCIAL_LINKS } from '../../constants/social';
import './SocialLinks.css';

const SocialLinks = ({ className, itemClassName = 'social-link-btn' }) => (
  <div className={className}>
    {SOCIAL_LINKS.map(({ icon, href, label }) => (
      <a key={label} href={href} target="_blank" rel="noreferrer"
        className={itemClassName} aria-label={label}>
        <i className={icon} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
