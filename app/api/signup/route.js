// app/api/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Validate fields
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be 6+ characters" }, { status: 400 });
    }

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const response = NextResponse.json(
      { message: "Signup successful", user: { name: newUser.name, email: newUser.email } },
      { status: 201 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}