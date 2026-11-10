/* import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow access to /privacy and /terms pages without checking authentication
  if (["/terms-policy", "/reset-password", "/forgot-password"].includes(request.nextUrl.pathname)) {
    return supabaseResponse;
  }


  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/sign-up") &&
    !request.nextUrl.pathname.startsWith("/sign-in") &&
    request.nextUrl.pathname !== "/" 
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // If the user is logged in and the request is for the login or sign-up page
  if (
    user &&
    (request.nextUrl.pathname === "/sign-in" || request.nextUrl.pathname === "/sign-up")
  ) {
    // Redirect the user to a different page, e.g., the dashboard or home page
    const url = request.nextUrl.clone();
    url.pathname = "/browse"; // Change this to the desired logged-in landing page
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
} */


  import { createServerClient } from "@supabase/ssr";
  import { type NextRequest, NextResponse } from "next/server";

  export const updateSession = async (request: NextRequest) => {
    if (process.env.DEMO_MODE === "true") {
      return NextResponse.next({ request: { headers: request.headers } });
    }
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    try {
      // Create an unmodified response
      let response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              response = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      // This will refresh session if expired - required for Server Components
      // https://supabase.com/docs/guides/auth/server-side/nextjs
      const user = await supabase.auth.getUser();

      // Allow access to Terms of Service and Privacy Policy without authentication
      if (
        request.nextUrl.pathname === "/terms-of-service" ||
        request.nextUrl.pathname === "/privacy-policy"
      ) {
        return response;
      }

      // Protected routes
      if (
        !request.nextUrl.pathname.startsWith("/forgot-password") &&
        !request.nextUrl.pathname.startsWith("/sign-in") &&
        !request.nextUrl.pathname.startsWith("/sign-up") &&
        !request.nextUrl.pathname.startsWith("/reset-password") && // Add this line
        !request.nextUrl.pathname.startsWith("/auth/callback") && // Add this line
        request.nextUrl.pathname !== "/" &&
        user.error
      ) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Redirect authenticated users from auth pages to protected area
      if (
        (request.nextUrl.pathname.startsWith("/forgot-password") ||
          request.nextUrl.pathname.startsWith("/sign-in") ||
          request.nextUrl.pathname.startsWith("/sign-up")) &&
        !user.error
      ) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }

      return response;
    } catch (e) {
      // If you are here, a Supabase client could not be created!
      // This is likely because you have not set up environment variables.
      // Check out http://localhost:3000 for Next Steps.
      return NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
    }
  };
