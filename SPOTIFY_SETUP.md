# Spotify API Setup Guide

This guide will help you set up the Spotify API integration to display your currently playing track on your portfolio.

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create app"**
4. Fill in the app details:
   - **App name**: Your portfolio name (e.g., "Jasmita's Portfolio")
   - **App description**: "Personal portfolio website"
   - **Website**: Your website URL (e.g., `https://jasmitayechuri.dev`)
   - **Redirect URI**: `http://localhost:3000/api/spotify/callback` (for local testing)
   - **Redirect URI (Production)**: `https://yourdomain.com/api/spotify/callback` (add this after deployment)
5. Check the checkbox to agree to the terms
6. Click **"Save"**

## Step 2: Get Your Client ID and Client Secret

1. In your app dashboard, you'll see:
   - **Client ID**: Copy this value
   - **Client Secret**: Click **"Show client secret"** and copy this value
2. Save these values - you'll need them for environment variables

## Step 3: Get Your Refresh Token

You need to get a refresh token that allows your app to access your Spotify account. Here's how:

### Option A: Using a Script (Recommended)

1. Create a file called `get-spotify-token.js` in your project root:

```javascript
// get-spotify-token.js
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:3000/api/spotify/callback';

// Step 1: Get authorization code
const scopes = 'user-read-currently-playing user-read-playback-state';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

console.log('Visit this URL and authorize the app:');
console.log(authUrl);
console.log('\nAfter authorizing, copy the "code" parameter from the redirect URL');
```

2. Run the script: `node get-spotify-token.js`
3. Visit the URL it prints and authorize your app
4. Copy the `code` parameter from the redirect URL
5. Exchange the code for a refresh token using this script:

```javascript
// exchange-token.js
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:3000/api/spotify/callback';
const code = 'PASTE_YOUR_CODE_HERE';

const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${authString}`,
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  }),
})
  .then(res => res.json())
  .then(data => {
    console.log('Refresh Token:', data.refresh_token);
    console.log('\nSave this refresh token as SPOTIFY_REFRESH_TOKEN in your .env file');
  })
  .catch(err => console.error('Error:', err));
```

### Option B: Using an Online Tool

1. Visit [Spotify OAuth Helper](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) or use a tool like [Postman](https://www.postman.com/)
2. Follow the OAuth 2.0 Authorization Code Flow
3. Make sure to request these scopes:
   - `user-read-currently-playing`
   - `user-read-playback-state`

## Step 4: Set Up Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

3. **Important**: Never commit `.env.local` to git! It should already be in `.gitignore`

## Step 5: Configure Next.js for External Images

1. Open `next.config.ts` (or `next.config.js`)
2. Add the Spotify image domain to the images configuration:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Spotify album art domain
      },
    ],
  },
};

export default nextConfig;
```

## Step 6: Test Locally

1. Make sure your `.env.local` file is set up correctly
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000`
4. Play a song on Spotify
5. The widget should show your currently playing track!

## Step 7: Deploy to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same three variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
4. Update your Spotify app's redirect URI to include your production domain
5. Redeploy your site

## Troubleshooting

### "Failed to fetch Spotify data"
- Check that all environment variables are set correctly
- Verify your refresh token is still valid (they don't expire, but can be revoked)
- Check the browser console and server logs for errors

### "Not playing" always shows
- Make sure Spotify is actually playing on your account
- The API only shows what's currently playing, not recently played
- Try refreshing the page after starting a song

### Images not loading
- Make sure `next.config.ts` includes the Spotify image domain
- Check that the album has artwork available

## Security Notes

- **Never** commit your `.env.local` file to git
- Keep your Client Secret and Refresh Token private
- If your refresh token is compromised, revoke it in your Spotify app settings and generate a new one
- The refresh token allows long-term access to your account - treat it like a password

## Additional Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Currently Playing Endpoint](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track)
