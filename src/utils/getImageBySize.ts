/**
 * Get an image url of a specific size
 *
 * @function getImageBySize
 * @param {SpotifyApi.ImageObject[] | undefined} images - The array of images
 * @param {number} targetSize - the target size of the image we're looking for
 *
 * @returns {SpotifyApi.ImageObject['url']}
 */
const getImageBySize = (
  images: SpotifyApi.ImageObject[] | undefined,
  targetSize: number,
): SpotifyApi.ImageObject['url'] => {
  // @todo set the default image to use, need better default
  let imageUrl = `https://picsum.photos/${targetSize}`;

  if (!images) {
    return imageUrl;
  }

  // if `images` then default to the first
  imageUrl = images?.[0].url;

  // If an images width matches our `targetSize`, use that image
  images.forEach((image) => {
    if (image.width === targetSize) {
      imageUrl = image.url;
    }
  });

  return imageUrl;
};

export default getImageBySize;
