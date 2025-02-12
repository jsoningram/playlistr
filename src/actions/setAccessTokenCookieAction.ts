'use server';

import { cookies } from 'next/headers';

import { AuthenticationResponse } from '@/types/Spotify';

const setAccessTokenCookieAction = async (
  cookieName: string,
  data: AuthenticationResponse,
) => {
  const _cookies = await cookies();

  // Store the access token in a secure HttpOnly cookie. HttpOnly secure
  // cookies are a security feature designed to mitigate the risk of
  // client-side scripts accessing cookies, thereby reducing the potential for
  // cross-site scripting (XSS) attacks. When a cookie is marked as HttpOnly,
  // it tells the browser not to expose the cookie via JavaScript. This
  // restriction helps prevent attackers from stealing session cookies through
  // malicious scripts injected into web pages.
  _cookies.set(cookieName, data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: data.expires_in,
    path: '/',
  });
};

export default setAccessTokenCookieAction;
