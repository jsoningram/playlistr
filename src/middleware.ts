import { NextMiddleware, NextResponse } from 'next/server';
import { chain } from '@/middlewares/chain';

import withSpotifyUserAuthentication from './middlewares/withSpotifyUserAuthentication';

/**
 * Nextjs middleware runs for all requests (pages, api endpoints, etc.) and runs
 * even when cache is enabled. A single middleware is used for all
 * requests/endpoints which requires us to chain them and apply conditional
 * logic
 *
 * @see {@link https://vercel.com/docs/functions/edge-middleware/middleware-api#
 * | nextjs (edge) middleware documentation}
 */
export const middleware: NextMiddleware = async (request, event) => {
  // Similar to `request`, this response is passed/shared by all middleware in
  // the chain so that modifications to the response can accumulate
  const response = new NextResponse();

  const middlewares = chain([withSpotifyUserAuthentication]);

  return middlewares(request, response, event);
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
