'use client';

const skills = {
  'Programming Languages': [
    'Python',
    'JavaScript',
    'TypeScript',
    'Java',
    'C++',
    'SQL',
  ],
  'Frameworks & Libraries': [
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'Django',
    'Flask',
  ],
  'Tools & Technologies': [
    'Git',
    'Docker',
    'AWS',
    'MongoDB',
    'PostgreSQL',
    'Firebase',
  ],
  'Design & Product': [
    'Figma',
    'Product Management',
    'UI/UX Design',
    'Agile',
    'Scrum',
  ],
};

const interests = [
  'Machine Learning',
  'Data Science',
  'Product Development',
  'Open Source',
  'Reading',
  'Traveling',
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
          Skills & Interests
        </h2>

        {/* Skills */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-[var(--accent)]">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[var(--foreground)]/10 text-[var(--foreground)] text-xs sm:text-sm font-medium hover:bg-[var(--accent)]/20 hover:text-[var(--accent)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">Interests</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm sm:text-base font-medium hover:bg-[var(--accent)]/20 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
