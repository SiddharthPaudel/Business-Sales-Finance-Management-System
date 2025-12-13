import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { saveFile } from "@/lib/saveFile";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await Product.find({ userId: session.user.id });

  return NextResponse.json(products);
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const form = await req.formData();
    const file = form.get("image");
    let savedImage = "";

    if (file && file.name) {
      savedImage = await saveFile(file);
    }

    const newProduct = await Product.create({
      userId: session.user.id, // 🔥 Save owner ID
      name: form.get("name"),
      description: form.get("description"),
      price: form.get("price"),
      stock: form.get("stock"),
      image: savedImage,
    });

    return NextResponse.json(newProduct);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
