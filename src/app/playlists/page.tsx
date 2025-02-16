'use client';

import { useEffect, useState, type FunctionComponent } from 'react';

import PlaylistCard from '@/components/PlaylistCard/PlaylistCard';

const Playlists: FunctionComponent = () => {
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/playlists/currentUser', {
        method: 'GET',
      });

      const data = await response.json();

      setPlaylists(data);
    };

    fetchData();
  }, []);

  if (!playlists) {
    return null;
  }

  console.log('!_###_! playlist', {
    playlists,
  });

  return (
    <section className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-4">
      {playlists.items.map((pl, i) => {
        if (!pl.images || !pl.tracks.total) {
          return null;
        }

        return (
          <PlaylistCard
            key={`PlaylistCard-${i}`}
            name={pl.name}
            description={pl.description}
            id={pl.id}
            images={pl.images}
          />
        );
      })}
    </section>
  );
};

export default Playlists;
