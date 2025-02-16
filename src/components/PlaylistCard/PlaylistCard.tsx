import { FunctionComponent } from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import AlbumArt from '../AlbumArt/AlbumArt';

type PlaylistCardProps = Pick<
  SpotifyApi.PlaylistBaseObject,
  'name' | 'description' | 'id'
> & { images: SpotifyApi.ImageObject[] };

const PlaylistCard: FunctionComponent<PlaylistCardProps> = ({
  description,
  id,
  images,
  name,
}) => {
  return (
    <Link href={`/playlists/${id}`}>
      <Card className="w-[300px]">
        <span className="h-[300px] overflow-hidden">
          <AlbumArt
            altText="Card Image"
            images={images}
            size={300}
            variant="card"
          />
        </span>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1 text-h5 font-bold">
            {name}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{ __html: description || ' ' }}
            />
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
