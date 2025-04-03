import authApi from "@/services/auth-service-apis";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);
  const idToken = req.cookies.get("id_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Case 1: Public route with valid token - redirect to home
  if (isPublicRoute && idToken) {
    const user = await validateToken(idToken);
    if (user) return redirectToHome(req);
    return NextResponse.next();
  }

  // Case 2: Public route without token - allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Case 3: Protected route - validate token or attempt refresh
  let user = idToken ? await validateToken(idToken) : null;

  // Try refresh if token is invalid but refresh token exists
  if (!user && refreshToken) {
    const newToken = await refreshIdToken(refreshToken);
    if (newToken) {
      user = await validateToken(newToken);
      if (user) {
        const response = NextResponse.next();
        response.cookies.set("id_token", newToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        return response;
      }
    }
  }

  // Redirect to login if still not authenticated
  return user ? NextResponse.next() : redirectToLogin(req);
}

// Helper functions
async function validateToken(token: string) {
  try {
    return await authApi.validateJwt(token);
  } catch {
    return null;
  }
}

async function refreshIdToken(refreshToken: string) {
  try {
    return await authApi.refreshJwt(refreshToken);
  } catch {
    return null;
  }
}

const redirectToLogin = (req: NextRequest) =>
  NextResponse.redirect(new URL("/auth/login", req.nextUrl));
const redirectToHome = (req: NextRequest) =>
  NextResponse.redirect(new URL("/dashboard/projects", req.nextUrl));

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
};
