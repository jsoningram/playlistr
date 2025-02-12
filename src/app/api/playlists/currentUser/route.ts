import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { CookieKey } from '@/constants/app';
import refreshAccessToken from '@/services/refreshAccessToken';

import { ErrorResponse } from '@/types/Spotify';

export async function GET(request: NextRequest): Promise<
  NextResponse<SpotifyApi.ListOfUsersPlaylistsResponse> | ErrorResponse
> {

  console.log('!_###_! id', {
    request,
  });
  // Attempt to get existing access token
  let accessToken = (await cookies()).get(CookieKey.AccessToken)?.value;

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SPOTIFY_API_BASE_URL}/me/playlists`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Authentication error:', error);

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
