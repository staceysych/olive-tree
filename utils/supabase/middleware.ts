import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

export async function updateSession(request: NextRequest, response: NextResponse) {
  let supabaseResponse = response; // use the response from intlMiddleware

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // DON'T remove this line — needed for Supabase auth to work correctly
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const privateRoutes = ['/profile'];
  const isPrivateRoute = privateRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (!user && isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
