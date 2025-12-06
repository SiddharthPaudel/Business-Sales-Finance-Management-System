// app/api/logout/route.js
import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
