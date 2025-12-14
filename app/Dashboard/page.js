"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  const { stats, recentSales, topProducts } = data;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Revenue" value={`Rs. ${stats.totalRevenue}`} />
        <Card title="Today's Revenue" value={`Rs. ${stats.todayRevenue}`} />
        <Card title="Total Sales" value={stats.totalSalesCount} />
        <Card title="Units Sold" value={stats.totalUnitsSold} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recentSales.reverse()}>
              <XAxis
                dataKey="createdAt"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString()
                }
              />
              <YAxis />
              <Tooltip
                formatter={(v) => `Rs. ${v}`}
                labelFormatter={(l) =>
                  new Date(l).toLocaleDateString()
                }
              />
              <Line
                type="monotone"
                dataKey="totalAmount"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="revenue"
                nameKey="name"
                outerRadius={110}
                label
              >
                {topProducts.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `Rs. ${v}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= RECENT SALES TABLE ================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Recent Sales</h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Customer</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Total</th>
              <th className="p-2 text-center">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentSales.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="p-2 flex items-center gap-3">
                  {s.productId?.image ? (
                    <img
                      src={`/uploads/${s.productId.image}`}
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs">
                      N/A
                    </div>
                  )}
                  <span>
                    {s.productId?.name || "Deleted product"}
                  </span>
                </td>
                <td className="p-2 text-center">{s.customer}</td>
                <td className="p-2 text-center">{s.quantity}</td>
                <td className="p-2 text-center">Rs. {s.totalAmount}</td>
                <td className="p-2 text-center">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* ================= CARD COMPONENT ================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
