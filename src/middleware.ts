import authApi from "@/services/auth-service-apis";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  try {
    const user = await authApi.validateJwt();
    const cookieStore = await cookies();
    const id_token = cookieStore.get("id_token");

    if (!isPublicRoute && !user) {
      console.log("user is not authenticated");
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    if (isPublicRoute && user) {
      console.log("user is authenticated");
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } catch (error) {
    console.log("an error occurred:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).*)"],
};
