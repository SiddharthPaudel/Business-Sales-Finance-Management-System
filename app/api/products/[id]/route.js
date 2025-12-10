import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { saveFile } from "@/lib/saveFile";

export async function GET(req, context) {
  await connectDB();
  const { id } = await context.params; // <-- FIX HERE

  const product = await Product.findById(id);
  return NextResponse.json(product);
}


export async function PUT(req, context) {
  try {
    await connectDB();

    const params = await context.params; // 👈 FIX

    console.log("🔥 PARAMS:", params);

    const formData = await req.formData();

    const update = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
    };

    const file = formData.get("image");

    if (file && typeof file !== "string") {
      update.image = await saveFile(file);
    }

    const product = await Product.findByIdAndUpdate(params.id, update, {
      new: true,
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function DELETE(req, context) {
  try {
    await connectDB();

    const params = await context.params;  // 👈 FIX

    console.log("🔥 DELETE PARAMS:", params);

    if (!params?.id) {
      return NextResponse.json(
        { error: "Product ID missing" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


