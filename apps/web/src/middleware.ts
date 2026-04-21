import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const pathname = nextUrl.pathname;

  const protectedPrefixes = [
    '/dashboard',
    '/students',
    '/syllabus',
    '/applications',
    '/assessments',
    '/leadership',
  ];
  const needsAuth = protectedPrefixes.some((p) => pathname.startsWith(p));

  const token = cookies.get('authToken')?.value;

  if (needsAuth && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/students/:path*',
    '/syllabus/:path*',
    '/applications/:path*',
    '/assessments/:path*',
    '/leadership/:path*',
  ],
};
