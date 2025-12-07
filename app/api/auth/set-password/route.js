// app/api/auth/set-password/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { password } = await req.json();
  if (!password || password.length < 6) {
    return NextResponse.json({ message: "Password must be >= 6 chars" }, { status: 400 });
  }

  await connectDB();
  const hashed = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ email: session.user.email }, { password: hashed, provider: "credentials" });

  return NextResponse.json({ message: "Password set" }, { status: 200 });
}
