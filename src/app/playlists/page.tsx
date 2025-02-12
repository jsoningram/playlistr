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

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
      {playlists.items.map((pl, i) => {
        return (
          <PlaylistCard
            key={`PlaylistCard-${i}`}
            name={pl.name}
            description={pl.description}
            id={pl.id}
            imageUrl={pl.images[0].url}
          />
        );
      })}
    </div>
  );
};

export default Playlists;
