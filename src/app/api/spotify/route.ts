import { NextResponse } from 'next/server';

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({
        is_playing: false,
        item: null,
      });
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({
        is_playing: false,
        item: null,
      });
    }

    const data = await response.json();
    
    return NextResponse.json({
      is_playing: data.is_playing || false,
      item: data.item ? {
        name: data.item.name,
        artists: data.item.artists || [],
        external_urls: data.item.external_urls || {},
        album: data.item.album ? {
          images: data.item.album.images || [],
        } : undefined,
      } : null,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({
      is_playing: false,
      item: null,
    });
  }
}
