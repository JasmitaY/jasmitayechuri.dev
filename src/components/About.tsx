'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const roles = [
  'computer scientist',
  'product manager',
  'software engineer',
  'entrepreneur',
  'data analyst',
  'storyteller',
  'problem solver',
  'systems thinker',
  'collaborative leader',
  'athlete',
];

interface SpotifyData {
  is_playing: boolean;
  item?: {
    name: string;
    artists: Array<{ name: string }>;
    external_urls: { spotify: string };
    album?: {
      images: Array<{ url: string }>;
    };
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
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 pt-28 sm:pt-32 relative overflow-hidden">
      {/* Purple Blob Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] md:w-[1000px] md:h-[1000px] bg-[var(--accent)]/20 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10 flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-20">
          {/* Profile Picture - Left Side with Abstract Blob Border */}
          <div className="flex-shrink-0 relative">
            {/* Abstract blob layers creating organic border effect */}
            <div className="absolute -inset-8 sm:-inset-10 md:-inset-12 -z-10">
              {/* Outer blob layer */}
              <div 
                className="absolute inset-0 bg-[var(--accent)]/30 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] blur-2xl"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}
              ></div>
              {/* Middle blob layer */}
              <div 
                className="absolute inset-2 sm:inset-3 md:inset-4 bg-[var(--accent)]/40 rounded-[40%_60%_70%_30%_/_40%_70%_30%_60%] blur-xl"
                style={{
                  clipPath: 'polygon(25% 5%, 75% 5%, 95% 25%, 95% 75%, 75% 95%, 25% 95%, 5% 75%, 5% 25%)',
                }}
              ></div>
              {/* Inner blob layer */}
              <div 
                className="absolute inset-4 sm:inset-5 md:inset-6 bg-[var(--accent)]/50 rounded-[50%_50%_50%_50%_/_60%_40%_60%_40%] blur-lg"
                style={{
                  clipPath: 'polygon(20% 10%, 80% 10%, 90% 20%, 90% 80%, 80% 90%, 20% 90%, 10% 80%, 10% 20%)',
                }}
              ></div>
            </div>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl bg-[var(--foreground)]/10 flex items-center justify-center z-10">
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
                <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--accent)]">
                  JY
                </div>
              )}
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3">
              Jasmita Yechuri
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-[var(--foreground)]/80">
              Computer Science and Business Administration @ <span className="font-bold text-[var(--accent)]">University of Southern California</span>
            </p>

            <div className="h-10 sm:h-12 mb-4 sm:mb-6 flex items-center justify-center md:justify-start">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[var(--foreground)]/70 transition-opacity duration-500">
                A {roles[currentRole]}.
              </p>
            </div>

            {/* Spotify Widget Card */}
            <div className="mb-6 sm:mb-8 flex justify-center md:justify-start">
              {isLoading ? (
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 w-full max-w-sm">
                  <div className="w-12 h-12 rounded bg-[var(--foreground)]/10 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-[var(--foreground)]/10 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-24 bg-[var(--foreground)]/10 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : spotifyData?.is_playing && spotifyData.item ? (
                <a
                  href={spotifyData.item.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 hover:bg-[var(--foreground)]/10 transition-colors w-full max-w-sm group"
                >
                  {spotifyData.item.album?.images?.[0]?.url ? (
                    <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={spotifyData.item.album.images[0].url}
                        alt={`${spotifyData.item.name} album cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-[var(--accent)]"
                      >
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse flex-shrink-0"></span>
                      <p className="text-sm font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {spotifyData.item.name}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--foreground)]/60 truncate">
                      {spotifyData.item.artists[0]?.name}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 w-full max-w-sm">
                  <div className="w-12 h-12 rounded bg-[var(--foreground)]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-[var(--foreground)]/40"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-[var(--foreground)]/40 px-2 py-0.5 rounded-full bg-[var(--foreground)]/10">
                        offline
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground)]/40">
                      Not playing
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 sm:gap-6">
              <a
                href="https://www.linkedin.com/in/jasmita-yechuri"
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
                href="https://github.com/JasmitaY"
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
                href="mailto:jasmita99@gmail.com"
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
        </div>
      </div>
    </section>
  );
}
