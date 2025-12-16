import { connectDB } from "@/lib/db";
import Sale from "@/models/Sale";
import Product from "@/models/Product"

export async function GET(req) {
  try {
    await connectDB();

    // Optional date filters
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const sales = await Sale.find(filter)
      .populate("productId", "name price")
      .sort({ createdAt: -1 });

    // CSV Header
    let csv =
      "Date,Product,Customer,Quantity,Price Per Unit,Total Amount\n";

    sales.forEach((s) => {
      csv += `${new Date(s.createdAt).toLocaleDateString()},`;
      csv += `"${s.productId?.name || "Deleted Product"}",`;
      csv += `"${s.customer}",`;
      csv += `${s.quantity},`;
      csv += `${s.productId?.price || 0},`;
      csv += `${s.totalAmount}\n`;
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          "attachment; filename=sales-report.csv",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Server Error", { status: 500 });
  }
}
