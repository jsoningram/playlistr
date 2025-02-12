'use server';

import { cookies } from 'next/headers';
import { CookieKey, YearInSeconds } from '@/constants/app';

import { CreateStateKeyCookieAction } from '@/types/Action';

import generateRandomString from '@/utils/generateRandomString';

/**
 * Generate and store a state key which provides protection against attacks such
 * as cross-site request forgery. We'll compare the state parameter that it
 * received in the redirection URI (callback) with the state parameter it
 * originally provided to Spotify in the authorization URI. If there is
 * a mismatch then your app should reject the request and stop the
 * authentication flow.
 *
 * @function createStateKeyCookieAction
 *
 * @returns {Promise<CreateStateKeyCookieAction>} a state key used as the value
 * for the cookie
 */
const createStateKeyCookieAction =
  async (): Promise<CreateStateKeyCookieAction> => {
    const _cookies = await cookies();
    const cookie = _cookies.get(CookieKey.StateKey);

    // Early return if we have an existing state key
    if (cookie && 'value' in cookie) {
      return { success: true, value: cookie.value };
    }

    const value = generateRandomString(16);

    // Store the state key in a secure HttpOnly cookie. HttpOnly secure cookies
    // are a security feature designed to mitigate the risk of client-side scripts
    // accessing cookies, thereby reducing the potential for cross-site scripting
    // (XSS) attacks. When a cookie is marked as HttpOnly, it tells the browser
    // not to expose the cookie via JavaScript. This restriction helps prevent
    // attackers from stealing session cookies through malicious scripts injected
    // into web pages.
    _cookies.set(CookieKey.StateKey, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: YearInSeconds,
      path: '/',
    });

    return { success: true, value };
  };

export default createStateKeyCookieAction;
