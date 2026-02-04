'use client';

interface ExperienceItem {
  company: string;
  logo?: string;
  website?: string;
  title: string;
  period: string;
  description?: string;
}

// Experience data from resume with company logos and websites
// Using Google's Favicon API as a fallback for logos: https://www.google.com/s2/favicons?domain=domain.com&sz=128
const experiences: ExperienceItem[] = [
  {
    company: 'Microsoft',
    logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128',
    website: 'https://www.microsoft.com/en-us',
    title: 'Technical Product Management Intern',
    period: 'May 2025 – Aug 2025',
  },
  {
    company: 'LavaLab',
    logo: 'https://www.google.com/s2/favicons?domain=usclavalab.org&sz=128',
    website: 'https://usclavalab.org/',
    title: 'Co-Founder & Product Manager',
    period: 'Jan 2025 – Dec 2025',
  },
  {
    company: 'USC Annenberg Media',
    logo: 'https://www.google.com/s2/favicons?domain=uscannenbergmedia.com&sz=128',
    website: 'https://www.uscannenbergmedia.com/',
    title: 'Software Engineer',
    period: 'Jul 2024 – Dec 2025',
  },
  {
    company: 'Microsoft',
    logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128',
    website: 'https://www.microsoft.com/en-us',
    title: 'Software Engineering & Product Management Intern',
    period: 'May 2024 – Aug 2024',
  },
  {
    company: 'Bank of America',
    logo: 'https://www.google.com/s2/favicons?domain=bankofamerica.com&sz=128',
    website: 'https://www.bankofamerica.com/',
    title: 'Summer Analyst Intern',
    period: 'Jun 2023 – Aug 2023',
  },
  {
    company: 'Polygence',
    logo: 'https://www.google.com/s2/favicons?domain=polygence.org&sz=128',
    website: 'https://www.polygence.org/',
    title: 'Product Management & Data Analytics Intern',
    period: 'Aug 2022 – Jun 2023',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-[var(--foreground)]/20"></div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 sm:pl-16 md:pl-24">
                {/* Timeline dot - centered vertically with the card */}
                <div className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--accent)] border-2 sm:border-4 border-[var(--background)] z-10"></div>

                <div className="bg-[var(--foreground)]/5 rounded-lg p-4 sm:p-5 md:p-6 hover:bg-[var(--foreground)]/10 transition-colors">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {exp.logo && exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 hover:border-[var(--accent)]/50 transition-colors flex items-center justify-center"
                        aria-label={`Visit ${exp.company} website`}
                      >
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="object-contain w-full h-full p-1"
                          onError={(e) => {
                            // Fallback to company initial if logo fails
                            const target = e.currentTarget;
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs sm:text-sm font-bold text-[var(--accent)]">${exp.company.charAt(0)}</div>`;
                            }
                          }}
                        />
                      </a>
                    )}
                    <div className="flex-1 min-w-0">
                      {exp.website ? (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:text-[var(--accent)] transition-colors"
                        >
                          <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.company}</h3>
                        </a>
                      ) : (
                        <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.company}</h3>
                      )}
                      <p className="text-sm sm:text-base text-[var(--foreground)]/80 mb-1">
                        {exp.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--foreground)]/60">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
