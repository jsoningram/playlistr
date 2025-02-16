'use client';

import { useEffect, useState, type FunctionComponent } from 'react';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import formatDuration from '@/utils/formatDuration';
import AlbumArt from '@/components/AlbumArt/AlbumArt';
import PlaylistHero from '@/components/PlaylistHero/PlaylistHero';
import TrackDetailsDialog from '@/components/TrackDetailsDialog/TrackDetailsDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PlaylistById: FunctionComponent = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] =
    useState<SpotifyApi.TrackObjectFull | null>(null);

  // Sets the selected track and opens the track details dialog
  const handleDialogOnClick = (track: SpotifyApi.TrackObjectFull) => {
    setSelectedTrack(track);
    setIsDialogOpen((prev) => !prev);
  };

  // Scroll to top so user does not end up further down the screen when clicking
  // over from another page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Make API call to get the requested playlist
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

  // Early return until we have playlist data from the API
  if (!playlist) {
    return null;
  }

  return (
    <>
      <PlaylistHero playlist={playlist} />
      <div
        className={cn(
          'relative mx-auto flex max-h-screen w-full flex-col divide-y divide-gray-200 overflow-y-scroll shadow-lg ring-1 ring-black/5 dark:divide-gray-200/5 sm:w-2/3',
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
                'flex items-center justify-between gap-4 bg-white p-4 hover:bg-slate-50 dark:bg-gray-900 hover:dark:bg-gray-800',
              )}
            >
              <div className="flex flex-1 items-start gap-4">
                <AlbumArt
                  altText="album art"
                  images={track?.album.images}
                  size={64}
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
              <TrackDetailsDialog
                track={selectedTrack}
                isOpen={isDialogOpen}
                handleOnOpenChange={() => setIsDialogOpen(!isDialogOpen)}
              />
              <span className="rotate-90 self-start font-bold leading-none">
                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <span onClick={() => handleDialogOnClick(track)}>
                        View Details
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlaylistById;
