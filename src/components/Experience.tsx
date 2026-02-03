'use client';

import Image from 'next/image';

interface ExperienceItem {
  company: string;
  logo?: string;
  title: string;
  period: string;
  description?: string;
}

// Sample data - replace with your actual experience
const experiences: ExperienceItem[] = [
  {
    company: 'Company Name',
    title: 'Software Engineer',
    period: '2023 - Present',
    description: 'Building amazing products and solving complex problems.',
  },
  {
    company: 'Previous Company',
    title: 'Product Manager',
    period: '2021 - 2023',
    description: 'Led product development and strategy initiatives.',
  },
  {
    company: 'Another Company',
    title: 'Data Analyst',
    period: '2020 - 2021',
    description: 'Analyzed data to drive business decisions.',
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
                {/* Timeline dot */}
                <div className="absolute left-2 sm:left-4 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--accent)] border-2 sm:border-4 border-[var(--background)] z-10"></div>

                <div className="bg-[var(--foreground)]/5 rounded-lg p-4 sm:p-5 md:p-6 hover:bg-[var(--foreground)]/10 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3">
                    {exp.logo && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">{exp.title}</h3>
                      <p className="text-[var(--accent)] font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        {exp.company}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--foreground)]/60">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm sm:text-base text-[var(--foreground)]/70 mt-2 sm:mt-3">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
