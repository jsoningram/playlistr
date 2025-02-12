import { cookies } from 'next/headers';
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';
import { BaseUrl, CookieKey } from '@/constants/app';

import {
  type CustomMiddleware,
  type MiddlewareFactory,
} from '@/types/Middleware';

/**
 * Redirects user login request to provider's authentication screen
 *
 * @function withUserAuthentication
 *
 * @returns {CustomMiddleware} Description
 */
const withSpotifyUserAuthentication: MiddlewareFactory = (
  next,
): CustomMiddleware => {
  return async (
    request: NextRequest,
    response: NextResponse,
    _next: NextFetchEvent,
  ) => {
    const { pathname } = request.nextUrl;
    const stateKey = (await cookies()).get(CookieKey.StateKey);

    // Limit the number of requests that we analyze in this middleware
    if (pathname.startsWith('/spotify/login')) {
      const queryString = new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        redirect_uri: `${BaseUrl}/api/callback`,
        response_type: 'code',
        scope: 'user-read-private user-read-email',
        state: stateKey?.value || '',
      }).toString();

      return NextResponse.redirect(
        `https://accounts.spotify.com/authorize?${queryString}`,
      );
    }

    return next(request, response, _next);
  };
};

export default withSpotifyUserAuthentication;
