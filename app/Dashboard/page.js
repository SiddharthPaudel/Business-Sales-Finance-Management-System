"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading dashboard...
      </div>
    );

  const { stats, recentSales, topProducts } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-8">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard title="Total Revenue" value={`Rs. ${stats.totalRevenue}`} />
        <StatCard title="Today" value={`Rs. ${stats.todayRevenue}`} />
        <StatCard title="Total Sales" value={stats.totalSalesCount} />
        <StatCard title="Units Sold" value={stats.totalUnitsSold} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Trend */}
        <DashboardWidget title="Revenue Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={[...recentSales].reverse()}>
              <XAxis
                dataKey="createdAt"
                tick={{ fontSize: 12 }}
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString()
                }
              />
              <YAxis tick={{ fontSize: 12 }} />
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
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardWidget>

        {/* Revenue by Product */}
        <DashboardWidget title="Revenue by Product">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="revenue"
                nameKey="name"
                outerRadius={95}
                label={({ name }) => name}
              >
                {topProducts.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `Rs. ${v}`} />
            </PieChart>
          </ResponsiveContainer>
        </DashboardWidget>
      </div>

      {/* ================= RECENT SALES ================= */}
      <DashboardWidget title="Recent Sales">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-3 text-left font-medium">Product</th>
                <th className="pb-3 text-center font-medium">Customer</th>
                <th className="pb-3 text-center font-medium">Qty</th>
                <th className="pb-3 text-center font-medium">Total</th>
                <th className="pb-3 text-center font-medium">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentSales.map((s) => (
                <tr
                  key={s._id}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="py-4 flex items-center gap-3">
                    {s.productId?.image ? (
                      <img
                        src={`/uploads/${s.productId.image}`}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                    <span className="truncate max-w-[160px] font-medium">
                      {s.productId?.name || "Deleted product"}
                    </span>
                  </td>

                  <td className="py-4 text-center text-gray-600">
                    {s.customer}
                  </td>

                  <td className="py-4 text-center">
                    {s.quantity}
                  </td>

                  <td className="py-4 text-center font-semibold">
                    Rs. {s.totalAmount}
                  </td>

                  <td className="py-4 text-center text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardWidget>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5">
      
      {/* Gradient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition" />

      {/* Accent dot */}
      <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />

      <div className="relative">
        <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">
          {title}
        </p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function DashboardWidget({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <h2 className="text-sm font-medium text-gray-700 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
