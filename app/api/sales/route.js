import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Sale from "@/models/Sale";
import Product from "@/models/Product";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const sales = await Sale.find({})
//       .populate("productId", "name price") // populate only name and price
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ sales });
//   } catch (error) {
//     console.log("Get Sales Error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connectDB();

    const sales = await Sale.find();

    // Find orphan sales
    const orphanSales = [];
    for (const sale of sales) {
      const productExists = await Product.exists({ _id: sale.productId });
      if (!productExists) orphanSales.push(sale._id);
    }

    // Delete orphan sales
    if (orphanSales.length > 0) {
      await Sale.deleteMany({ _id: { $in: orphanSales } });
    }

    const cleanedSales = await Sale.find().populate("productId");

    return NextResponse.json({ sales: cleanedSales });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB();
    const { productId, quantity, userId, customer } = await req.json();

    if (!productId || !quantity || !userId || !customer) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Get product price
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (quantity > product.stock) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
    }

    const totalAmount = product.price * quantity;

    // Create Sale
    const newSale = await Sale.create({ productId, userId, quantity, totalAmount ,customer });

    // Reduce product stock
    product.stock -= quantity;
    await product.save();

    return NextResponse.json({ message: "Sale recorded", sale: newSale }, { status: 201 });
  } catch (error) {
    console.log("Create Sale Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
