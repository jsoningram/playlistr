import { NextRequest, NextResponse } from 'next/server';

import {
  type CustomMiddleware,
  type MiddlewareFactory,
} from '@/types/Middleware';

export function chain(
  functions: MiddlewareFactory[] = [],
  index = 0,
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (_request: NextRequest, response: NextResponse) =>
    NextResponse.next(response);
}
