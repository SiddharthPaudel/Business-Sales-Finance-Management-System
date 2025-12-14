import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Sale from "@/models/Sale";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const sale = await Sale.findById(params.id);
    if (!sale) return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    return NextResponse.json({ sale });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const { quantity,customer } = await req.json();

    const sale = await Sale.findById(id);
    if (!sale) {
      return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    }

    const product = await Product.findById(sale.productId);

    // restore previous stock
    product.stock += sale.quantity;

    if (product.stock < quantity) {
      return NextResponse.json({ message: "Insufficient stock" }, { status: 400 });
    }

    // deduct new stock
    product.stock -= quantity;
    await product.save();

    sale.quantity = quantity;
    sale.customer = customer;
    sale.totalAmount = quantity * product.price;
    await sale.save();

    return NextResponse.json({ message: "Sale updated", sale });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const sale = await Sale.findById(id);
    if (!sale) {
      return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    }

    const product = await Product.findById(sale.productId);
    product.stock += sale.quantity;
    await product.save();

    await sale.deleteOne();

    return NextResponse.json({ message: "Sale deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}