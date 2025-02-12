import { type FunctionComponent } from 'react';
import Image from 'next/image';

type PlaylistHeroProps = {
  playlist: SpotifyApi.SinglePlaylistResponse;
};

const PlaylistHero: FunctionComponent<PlaylistHeroProps> = ({ playlist }) => {
  return (
    <div className="relative mx-auto flex w-full flex-col items-center rounded-t-xl bg-gradient-to-t from-black to-gray-800 px-4 pb-0 pt-4 shadow-lg sm:w-2/3 sm:flex-row sm:pb-4">
      <Image
        alt="album artwork"
        className="h-[300px] w-[300px] object-cover"
        src={playlist.images[0].url || ''}
        width={300}
        height={300}
      />
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-h3 sm:text-h1 w-full text-center font-bold text-white">
          {playlist.name}
        </h1>
        <h2 className="text-h5 sm:text-h4 w-full pb-4 text-center text-slate-400">
          {playlist.description}
        </h2>
      </div>
    </div>
  );
};

export default PlaylistHero;
