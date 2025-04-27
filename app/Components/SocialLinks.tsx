import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const socialLinks = [
  { icon: faGithub, label: '', url: 'https://github.com/1biest' },
  { icon: faLinkedin, label: '', url: 'https://www.linkedin.com/in/biest/' },
  { icon: faTelegram, label: '', url: 'https://t.me/Biesterfeldt' },
  { icon: faXTwitter, label: '', url: 'https://x.com/1biesterfeldt' },
  { icon: faFilePdf, label: 'Résumé', url: '/Logan Biesterfeldt Resume 2025.pdf' },
];

const SocialLinks = () => {
  return (
    <div className="relative lg:fixed bottom-0 left-0 px-0 lg:px-20 pb-10 lg:pb-20 flex gap-2">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative ${link.label ? 'w-26 px-3' : 'w-9 px-3'} h-11 py-2 group cursor-pointer z-30 text-2xl text-center`}
        >
          <div className="relative flex transition z-30 pt-[2px] group-hover:--accent-color justify-center items-center h-full">
            <FontAwesomeIcon icon={link.icon} />
            {link.label && <span className="pl-2 w-20 text-base">{link.label}</span>}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
