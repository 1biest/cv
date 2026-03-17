import React from 'react';

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  summary: string;
  links?: {
    label: string;
    url: string;
    primary?: boolean;
  }[];
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ title, subtitle, summary, links }) => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">{title}</h1>
        <h2 className="text-xl md:text-2xl text-gray-400 font-medium mb-8">{subtitle}</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
          {summary}
        </p>

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  link.primary
                    ? 'bg-[color:var(--accent-color)] text-[#101322] hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black border border-transparent'
                    : 'bg-transparent border border-gray-600 hover:border-white hover:bg-white/5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
