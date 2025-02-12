import { NextMiddlewareResult } from 'next/dist/server/web/types';
import {
  type NextFetchEvent,
  type NextRequest,
  type NextResponse,
} from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  response: NextResponse,
  event: NextFetchEvent,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (
  middleware: CustomMiddleware,
) => CustomMiddleware;
