'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const roles = [
  'Computer Scientist',
  'Product Manager',
  'Software Engineer',
  'Entrepreneur',
  'Data Analyst',
  'Problem Solver',
];

interface SpotifyData {
  is_playing: boolean;
  item?: {
    name: string;
    artists: Array<{ name: string }>;
    external_urls: { spotify: string };
  };
}

export default function About() {
  const [currentRole, setCurrentRole] = useState(0);
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev: number) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const response = await fetch('/api/spotify');
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setSpotifyData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 pt-28 sm:pt-32">
      <div className="max-w-4xl mx-auto text-center w-full">
        <div className="mb-6 sm:mb-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden border-3 sm:border-4 border-[var(--accent)] shadow-lg bg-[var(--foreground)]/10 flex items-center justify-center">
            {!imageError ? (
              <Image
                src="/profile.jpg"
                alt="Jasmita Yechuri"
                fill
                className="object-cover"
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--accent)]">
                JY
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4">
          Jasmita <span className="text-[var(--accent)]">Yechuri</span>
        </h1>

        <div className="h-10 sm:h-12 mb-4 sm:mb-6 flex items-center justify-center px-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[var(--foreground)]/70 transition-opacity duration-500">
            {roles[currentRole]}
          </p>
        </div>

        {/* Spotify Widget */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-4">
          <span className="text-[var(--foreground)]/60 whitespace-nowrap">I most recently played:</span>
          {isLoading ? (
            <span className="text-[var(--foreground)]/40">Loading...</span>
          ) : spotifyData?.is_playing && spotifyData.item ? (
            <a
              href={spotifyData.item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline flex items-center gap-1 text-center"
            >
              <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse flex-shrink-0"></span>
              <span className="truncate max-w-[200px] sm:max-w-none">{spotifyData.item.name} by {spotifyData.item.artists[0]?.name}</span>
            </a>
          ) : (
            <span className="text-[var(--foreground)]/40">Offline</span>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 sm:gap-6">
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--accent)]/20 flex items-center justify-center transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--accent)]/20 flex items-center justify-center transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="mailto:your-email@example.com"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--accent)]/20 flex items-center justify-center transition-colors"
            aria-label="Email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
