import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Sale from "@/models/Sale";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  /* ================= TOTAL STATS ================= */
  const totalRevenueAgg = await Sale.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRevenueAgg = await Sale.aggregate([
    { $match: { createdAt: { $gte: today } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const totalSalesCount = await Sale.countDocuments();

  const totalUnitsSoldAgg = await Sale.aggregate([
    { $group: { _id: null, total: { $sum: "$quantity" } } }
  ]);

  /* ================= RECENT SALES (POPULATED) ================= */
  const recentSales = await Sale.find()
    .sort({ createdAt: -1 })
    .limit(7)
    .populate("productId", "name image")
    .lean();

  /* ================= TOP PRODUCTS (PIE CHART) ================= */
  const topProducts = await Sale.aggregate([
    {
      $group: {
        _id: "$productId",
        revenue: { $sum: "$totalAmount" }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $project: {
        name: "$product.name",
        revenue: 1
      }
    }
  ]);

  return NextResponse.json({
    stats: {
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      todayRevenue: todayRevenueAgg[0]?.total || 0,
      totalSalesCount,
      totalUnitsSold: totalUnitsSoldAgg[0]?.total || 0
    },
    recentSales,
    topProducts
  });
}
