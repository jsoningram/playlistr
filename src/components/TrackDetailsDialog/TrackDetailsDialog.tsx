'use client';

import { FunctionComponent } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AlbumArt from '../AlbumArt/AlbumArt';

interface TrackDetailsDialogProps {
  isOpen: boolean;
  handleOnOpenChange: () => void;
  track: SpotifyApi.TrackObjectFull | null;
}

const TrackDetailsDialog: FunctionComponent<TrackDetailsDialogProps> = ({
  isOpen,
  handleOnOpenChange,
  track,
}) => {
  if (!track) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <AlbumArt
            altText="album artwork"
            images={track.album.images}
            size={300}
          />
          <DialogTitle>{track.name}</DialogTitle>
          <DialogDescription>
            {`From the album "${track.album.name}"`}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TrackDetailsDialog;
