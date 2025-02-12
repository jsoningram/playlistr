import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

type PlaylistCardProps = Pick<
  SpotifyApi.PlaylistBaseObject,
  'name' | 'description' | 'id'
> & { imageUrl: string };

const PlaylistCard: FunctionComponent<PlaylistCardProps> = ({
  description,
  id,
  imageUrl,
  name,
}) => {
  return (
    <Link href={`/playlists/${id}`}>
      <Card className="w-[300px]">
        <Image
          src={imageUrl}
          alt="Card Image"
          width={300}
          height={300}
          className="h-[300px] w-[300px] rounded-t-lg object-cover"
          style={{ aspectRatio: '300/300' }}
        />
        <CardContent className="p-4">
          <CardTitle className="text-h5 font-bold">{name}</CardTitle>
          <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
            {description || ' '}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
