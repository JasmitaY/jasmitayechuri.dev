'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  github?: string;
  skills: string[];
  category: string;
}

// Projects data
const projects: Project[] = [
  // Web Projects
  {
    id: '1',
    title: 'Personal Website',
    description: 'A modern, responsive portfolio website showcasing my experience, projects, and skills with dark/light mode support.',
    category: 'web',
    skills: ['TypeScript', 'CSS', 'JavaScript'],
    link: 'https://jasmitayechuri-dev.vercel.app',
    github: 'https://github.com/JasmitaY/jasmitayechuri.dev',
  },
  {
    id: '2',
    title: 'DateBetter Quiz',
    description: 'An interactive quiz application to help customers figure out what date flavor they should try basted on their love language; a result of taking the quiz.',
    category: 'web',
    skills: ['CSS', 'JavaScript', 'HTML'],
    link: 'https://date-better.vercel.app',
    github: 'https://github.com/JasmitaY/date-better',
  },
  {
    id: '3',
    title: 'Budget Tracker',
    description: 'An AI-powered budget tracking application to help users manage their finances and track spending.',
    category: 'web',
    skills: ['TypeScript', 'CSS', 'JavaScript', 'V0'],
    link: 'https://budget-tracking-ai.vercel.app',
    github: 'https://github.com/JasmitaY/budget-tracking-app',
  },
  {
    id: '4',
    title: 'USC Course Registration Schedule Helper',
    description: 'A full-stack course scheduler that integrates with USC Schedule of Classes API to help students plan their course registration.',
    category: 'web',
    skills: ['Java', 'HTML', 'JavaScript', 'Python'],
    github: 'https://github.com/JasmitaY/usc-course-registration',
  },
  {
    id: '5',
    title: 'bitByBit',
    description: 'A beginner-friendly educational coding tool built with Next.js to help students practice fundamental programming concepts.',
    category: 'web',
    skills: ['JavaScript', 'Dockerfile'],
    github: 'https://github.com/JasmitaY/bitByBIT',
  },
  // Mobile Projects
  {
    id: '6',
    title: 'Vision',
    description: 'A mobile application built with Swift and SwiftUI for iOS devices.',
    category: 'mobile',
    skills: ['Swift', 'SwiftUI'],
    github: 'https://github.com/JasmitaY/Vision',
  },
  {
    id: '7',
    title: 'HerHair3.0',
    description: 'A mobile application developed in Swift for iOS platforms.',
    category: 'mobile',
    skills: ['Swift'],
    github: 'https://github.com/JasmitaY/HerHair3.0',
  },
  // Presentations
  {
    id: '8',
    title: 'Introduction to Power BI',
    description: 'An educational presentation introducing Power BI and its capabilities for data visualization and business intelligence.',
    category: 'presentations',
    skills: ['Power BI', 'Data Visualization'],
    link: 'https://www.youtube.com/watch?v=xkArieXzmzE',
  },
  {
    id: '9',
    title: 'Oasis Pitch Deck',
    description: 'A comprehensive pitch deck for Oasis, a computer vision-based home monitoring system designed to help families respond to falls faster.',
    category: 'presentations',
    skills: ['Figma', 'Product Design'],
    link: 'https://embed.figma.com/proto/ZCuLMOVJfp889tbrbSkOth/Larvalab?node-id=1225-18921&starting-point-node-id=1225%3A18921&show-proto-sidebar=1&scaling=scale-down&content-scaling=fixed&t=WthIQAegWHz79rqn-9&embed-host=notion&footer=false&theme=system',
  },
];

const categories = ['all', 'web', 'mobile', 'presentations'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
          Projects
        </h2>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--action)] text-[var(--background)]'
                  : 'bg-[var(--foreground)]/10 text-[var(--foreground)] hover:bg-[var(--foreground)]/20'
              }`}
            >
              {category === 'all' ? 'All' : category === 'presentations' ? 'Presentations' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--foreground)]/5 rounded-lg overflow-hidden hover:bg-[var(--foreground)]/10 transition-all hover:shadow-lg group"
            >
              {project.image && (
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold flex-1 min-w-0">{project.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:opacity-80"
                        aria-label="View project"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)]/70 hover:text-[var(--accent)]"
                        aria-label="View on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/70 mb-3 sm:mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-[var(--accent)]/20 text-[var(--accent)] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
