import { NextResponse } from 'next/server';

export interface AuthenticationResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
}

export type ErrorResponse = NextResponse<{
  error: string;
}>;
