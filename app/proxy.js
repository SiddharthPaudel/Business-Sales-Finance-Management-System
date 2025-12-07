// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("authToken")?.value;

  const protectedRoutes = ["/dashboard", "/sales", "/customers", "/reports"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/sales/:path*", "/customers/:path*", "/reports/:path*"],
};
