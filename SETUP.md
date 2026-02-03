# Portfolio Website Setup

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add your profile image:
   - Place your profile picture in `/public/profile.jpg`
   - The image should be square (recommended: 800x800px or larger)
   - If the image doesn't exist, a fallback with initials "JY" will be shown

3. Update your personal information:
   - Edit `/src/components/About.tsx`:
     - Update LinkedIn URL (line 113)
     - Update GitHub URL (line 129)
     - Update email address (line 145)
   - Edit `/src/components/Experience.tsx`:
     - Replace the sample experience data with your actual work experience
   - Edit `/src/components/Projects.tsx`:
     - Replace the sample projects with your actual projects
   - Edit `/src/components/Skills.tsx`:
     - Update skills and interests to match yours

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Spotify Integration (Optional)

To enable the Spotify "I most recently played" feature:

1. Create a Spotify App at [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Set up OAuth flow to get access tokens
3. Update `/src/app/api/spotify/route.ts` with your Spotify API implementation
4. Add environment variables for Spotify credentials:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`

The API route is currently a placeholder that returns offline status.

## Customization

### Colors
The color scheme is defined in `/src/app/globals.css`:
- Light mode: Background `#F9F7F2`, Text `#2F3640`, Accent `#2ECC71`
- Dark mode: Background `#1A1C1E`, Text `#F5F6FA`, Accent `#55E6C1`

### Theme Toggle
The theme toggle button is positioned on the left side of the screen. The theme preference is saved in localStorage.

## Deployment

The site is ready to deploy on Vercel, Netlify, or any platform that supports Next.js.

```bash
npm run build
npm start
```
