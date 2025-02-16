import { type FunctionComponent } from 'react';

import formatDuration from '@/utils/formatDuration';

import AlbumArt from '../AlbumArt/AlbumArt';

type PlaylistHeroProps = {
  playlist: SpotifyApi.SinglePlaylistResponse;
};

const PlaylistHero: FunctionComponent<PlaylistHeroProps> = ({ playlist }) => {
  const totalDuration = playlist.tracks.items.reduce((acc, current) => {
    return acc + (current.track?.duration_ms ?? 0);
  }, 0);

  return (
    <section className="relative mx-auto flex w-full flex-col items-center rounded-t-xl bg-gradient-to-t from-white to-gray-200 px-4 pb-0 pt-4 shadow-lg dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-700 sm:w-2/3 sm:flex-row sm:pb-4">
      <span className="h-[300px] overflow-hidden rounded-lg shadow-lg shadow-black/50">
        <AlbumArt
          altText="album art for the current playlist"
          images={playlist.images}
          size={300}
          priority={true}
          variant="hero"
        />
      </span>
      <header className="flex flex-1 flex-col items-center justify-center">
        <h1
          dangerouslySetInnerHTML={{ __html: playlist.name }}
          className="line-clamp-1 w-full text-center text-h3 font-bold text-black dark:text-white sm:text-h1"
        ></h1>
        <p
          dangerouslySetInnerHTML={{
            __html: playlist.description || ' ',
          }}
          className="line-clamp-2 w-full text-center text-h5 leading-tight text-slate-600 dark:text-slate-400 sm:text-h4"
        ></p>
        <p className="py-4 text-h5 text-slate-600 dark:text-slate-400">
          {playlist.tracks.total}
          {' tracks | '}
          {formatDuration(totalDuration)} playing time
        </p>
      </header>
    </section>
  );
};

export default PlaylistHero;
