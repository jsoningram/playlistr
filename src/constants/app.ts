export enum CookieKey {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  StateKey = 'state_key',
}

export enum StorageKey {
  Theme = 'playlistr_theme',
}

// Seconds
export const MinuteInSeconds = 60;
export const HourInSeconds = MinuteInSeconds * 60;
export const DayInSeconds = HourInSeconds * 24;
export const WeekInSeconds = DayInSeconds * 7;
export const YearInSeconds = DayInSeconds * 365;
// Milliseconds
export const SecondInMilliseconds = 1000;
export const MinuteInMilliseconds = SecondInMilliseconds * 60;
export const HourInMilliseconds = MinuteInMilliseconds * 60;
export const DayInMilliseconds = HourInMilliseconds * 24;

export const BaseUrl = process.env.VERCEL_ENV
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_BASE_URL;
