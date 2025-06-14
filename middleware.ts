import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = await intlMiddleware(request);

  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  const privateRoutes = ['/dashboard'];
  const isPrivateRoute = privateRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (!isAuthenticated && isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return Response.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api, trpc, _vercel paths
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|trpc|_vercel|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 