import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

/**
 * Transforms the duration property (ms) to a string duration representation
 *
 * @function formatDuration
 * @param {number} duration - the duration in milliseconds
 *
 * @returns {string} The string representation of the track's duration
 */
const formatDuration = (duration: number): string => {
  const millisecondsInHour = 60000 * 60;
  const formatMinutes = 'm:ss';
  const formatHours = 'H:mm:ss';

  let format = formatMinutes;

  // Choose alternate format if time is greater than or equal to one hour
  if (duration >= millisecondsInHour) {
    format = formatHours;
  }

  return dayjs.duration(duration).format(format);
};

export default formatDuration;
