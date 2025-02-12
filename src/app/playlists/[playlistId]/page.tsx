'use client';

import { useEffect, useState, type FunctionComponent } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import formatDuration from '@/utils/formatDuration';
import PlaylistHero from '@/components/PlaylistHero/PlaylistHero';

const PlaylistById: FunctionComponent = () => {
  const { playlistId } = useParams<{ playlistId: string }>();

  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/playlists/byId?playlistId=${playlistId}`,
        {
          method: 'GET',
        },
      );

      const data = await response.json();

      setPlaylist(data);
    };

    fetchData();
  }, [playlistId]);

  if (!playlist) {
    return null;
  }

  return (
    <>
      <PlaylistHero playlist={playlist} />
      <div
        className={cn(
          'relative mx-auto flex h-svh w-full flex-col divide-y divide-gray-200 overflow-y-scroll shadow-lg ring-1 ring-black/5 dark:divide-gray-200/5 sm:w-2/3',
        )}
      >
        {playlist.tracks.items.map(({ track }, i) => {
          if (!track) return null;

          const releaseDate = new Date(
            track?.album.release_date || '',
          ).getFullYear();
          const artist =
            track?.artists.length > 1
              ? track?.artists.map((artist) => artist.name).join(', ')
              : track?.artists[0].name;

          return (
            <div
              key={`TrackList-${i}`}
              className={cn(
                'flex items-center justify-between gap-4 bg-white p-4 dark:bg-gray-900',
                i % 2 === 0 && 'bg-slate-50 dark:bg-gray-800',
              )}
            >
              <div className="flex flex-1 items-start gap-4">
                <Image
                  alt="album artwork"
                  className="h-[60px] w-[60px] object-cover"
                  src={track?.album.images[0].url || ''}
                  width={60}
                  height={60}
                />
                <div className="flex h-[60px] flex-col justify-between">
                  <div className="line-clamp-1 font-bold leading-none">
                    {track?.name}
                  </div>
                  <div className="line-clamp-1 leading-none">{artist}</div>
                  <div className="text-sm leading-none text-gray-500">
                    {releaseDate}
                  </div>
                </div>
              </div>
              <div className="self-start font-bold leading-none">
                {formatDuration(track?.duration_ms)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlaylistById;
