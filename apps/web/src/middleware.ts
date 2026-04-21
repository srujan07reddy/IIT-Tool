import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read the token stored by our login page
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define routes that require authentication
  const protectedPrefixes = ['/dashboard', '/admin', '/student', '/staff', '/technician', '/account'];
  const isProtectedRoute = protectedPrefixes.some(prefix => pathname.startsWith(prefix));

  // If accessing a protected route without a token, redirect to gateway
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};