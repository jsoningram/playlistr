import { SecondInMilliseconds } from '@/constants/app';

const msToSeconds = (timeInMillseconds: number): number =>
  Math.round(Number(timeInMillseconds) / SecondInMilliseconds);

export default msToSeconds;
