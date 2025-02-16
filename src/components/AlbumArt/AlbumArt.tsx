import { type FunctionComponent } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import getImageBySize from '@/utils/getImageBySize';

type AlbumArtProps = {
  altText: string;
  additionalClassNames?: string;
  images: SpotifyApi.ImageObject[];
  size: number;
  priority?: boolean;
  variant?: 'default' | 'hero' | 'card';
};

const AlbumArt: FunctionComponent<AlbumArtProps> = ({
  altText,
  additionalClassNames = '',
  images,
  priority = false,
  size,
  variant = 'default',
}) => {
  if (!Array.isArray(images)) {
    return null;
  }

  let baseClassNames;

  switch (variant) {
    case 'hero':
      baseClassNames = 'object-cover';

      break;

    case 'card':
      baseClassNames = 'rounded-t-lg object-cover';

      break;

    default:
      baseClassNames = '';

      break;
  }

  return (
    <Image
      alt={altText}
      className={cn(
        `h-[${size}px] w-[${size}px]`,
        baseClassNames,
        additionalClassNames,
      )}
      src={getImageBySize(images, size)}
      width={size}
      height={size}
      priority={priority}
    />
  );
};

export default AlbumArt;
