import authApi from "@/services/auth-service-apis";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  try {
    const cookieStore = await cookies();
    const idToken =
      cookieStore.get("id_token")?.value ||
      (await getIdTokenFromRefresh(cookieStore.get("refresh_token")?.value));

    if (!idToken && !isPublicRoute) {
      return redirectToLogin(req);
    }

    if (isPublicRoute && idToken) {
      return redirectToHome(req);
    }

    const user = idToken && (await authApi.validateJwt(idToken));

    if (!isPublicRoute && !user) {
      return redirectToLogin(req);
    }

    req.headers.set("X-User-ID", user._id);
  } catch (error) {
    console.log("An error occurred:", error);
  }

  return NextResponse.next();
}

const getIdTokenFromRefresh = async (refreshToken: string | undefined) => {
  if (refreshToken) {
    return await authApi.refreshJwt(refreshToken);
  }
  return null;
};

const redirectToLogin = (req: NextRequest) =>
  NextResponse.redirect(new URL("/auth/login", req.nextUrl));
const redirectToHome = (req: NextRequest) =>
  NextResponse.redirect(new URL("/", req.nextUrl));

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico|images/).*)"],
};
