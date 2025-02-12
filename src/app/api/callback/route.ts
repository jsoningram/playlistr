import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { BaseUrl, CookieKey, YearInSeconds } from '@/constants/app';

import { AuthenticationResponse } from '@/types/Spotify';

export async function GET(request: NextRequest) {
  const _cookies = await cookies();
  const cookie = _cookies.get(CookieKey.StateKey);
  const { code, state, error } = Object.fromEntries(
    new URL(request.url).searchParams.entries(),
  );

  // Compare the state parameter that we received in the redirection URI with
  // the state parameter it originally provided in the authorization URI. If
  // there is a mismatch, reject the request and stop the authentication flow.
  if (!state || state !== cookie?.value) {
    redirect(`/#${error}`);
  }

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${BaseUrl}/api/callback`,
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

    const data: AuthenticationResponse = await res.json();

    // Store the access token in a secure HttpOnly cookie. HttpOnly secure
    // cookies are a security feature designed to mitigate the risk of
    // client-side scripts accessing cookies, thereby reducing the potential for
    // cross-site scripting (XSS) attacks. When a cookie is marked as HttpOnly,
    // it tells the browser not to expose the cookie via JavaScript. This
    // restriction helps prevent attackers from stealing session cookies through
    // malicious scripts injected into web pages.
    _cookies.set(CookieKey.AccessToken, data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: data.expires_in,
      path: '/',
    });

    // Access tokens are intentionally configured to have a limited lifespan (1
    // hour), at the end of which, new tokens can be obtained by providing the
    // original refresh token acquired during the authorization token request
    // response above.
    _cookies.set(CookieKey.RefreshToken, data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: YearInSeconds,
      path: '/',
    });
  } catch (error) {
    console.error('Authentication error:', error);

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }

  return redirect('/');
}
