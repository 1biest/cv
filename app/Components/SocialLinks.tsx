import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const socialLinks = [
  { icon: faGithub, label: '', ariaLabel: 'GitHub', url: 'https://github.com/1biest' },
  { icon: faLinkedin, label: '', ariaLabel: 'LinkedIn', url: 'https://www.linkedin.com/in/biest/' },
  { icon: faTelegram, label: '', ariaLabel: 'Telegram', url: 'https://t.me/Biesterfeldt' },
  { icon: faXTwitter, label: '', ariaLabel: 'X', url: 'https://x.com/1biesterfeldt' },
  {
    icon: faFilePdf,
    label: 'Résumé',
    ariaLabel: 'Download résumé PDF',
    url: '/Logan Biesterfeldt Resume 2026.pdf',
  },
];

const SocialLinks = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-lg text-[var(--text)] shadow-sm transition hover:border-[color:var(--accent-color)] hover:text-[color:var(--accent-color)] ${link.label ? 'gap-2 px-4' : 'w-11 px-0'}`}
          aria-label={link.ariaLabel}
        >
          <FontAwesomeIcon icon={link.icon} className="text-[1.1rem]" />
          {link.label && <span className="text-sm font-medium">{link.label}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
