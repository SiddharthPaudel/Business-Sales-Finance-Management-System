import { connectDB } from "@/lib/db";
import Sale from "@/models/Sale";
import Product from "@/models/Product";
import PDFDocument from "pdfkit";

export async function GET(req) {
  try {
    await connectDB();

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

    // create PDF
    const doc = new PDFDocument({ margin: 40 });

    // collect chunks
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfEnd = new Promise((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });

    // Title
    doc.fontSize(18).text("Sales Report", { align: "center" });
    doc.moveDown();

    // Table header
    doc.fontSize(12).text(
      "Date | Product | Customer | Qty | Price | Total"
    );
    doc.moveDown(0.5);

    // Table rows
    sales.forEach((s) => {
      doc.text(
        `${new Date(s.createdAt).toLocaleDateString()} | ` +
          `${s.productId?.name || "Deleted"} | ` +
          `${s.customer} | ` +
          `${s.quantity} | ` +
          `${s.productId?.price || 0} | ` +
          `Rs. ${s.totalAmount}`
      );
    });

    doc.end();

    const buffer = await pdfEnd;

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=sales-report.pdf",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
