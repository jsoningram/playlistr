import { cookies } from 'next/headers';
import { CookieKey } from '@/constants/app';

import setAccessTokenCookieAction from '@/actions/setAccessTokenCookieAction';

const refreshAccessToken = async (): Promise<string | undefined> => {
  const _cookies = await cookies();
  const refreshToken = _cookies.get(CookieKey.RefreshToken)?.value;

  if (!refreshToken) {
    // redirect user back to login screen
    return;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.SPOTIFY_CLIENT_ID || '',
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization':
        'Basic ' +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await res.json();

  setAccessTokenCookieAction(CookieKey.AccessToken, data);

  return data.access_token;
};

export default refreshAccessToken;
