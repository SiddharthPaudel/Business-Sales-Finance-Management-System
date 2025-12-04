"use client";

import React, { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

// Minimal, single-file, production-minded Sales Dashboard page for Next.js (App router or Pages router).
// How to use:
// 1. Install dependencies: npm i recharts framer-motion
// 2. Make sure Tailwind is configured in your project (this component uses Tailwind classes).
// 3. Add an API route at /api/sales that returns JSON: { kpis, salesOverTime, topProducts, recentOrders }
//    Example API response shape is included in `mockResponse` below.
// 4. Drop this file into `app/dashboard/page.jsx` (app router) or `pages/dashboard.js` (pages router).

// --- Mock data (used as a fallback while API is not ready) ---
const mockResponse = {
  kpis: {
    revenue: 125420.5,
    orders: 1843,
    aov: 68.05,
    returningRate: 22.7,
  },
  salesOverTime: [
    { date: "2025-11-01", sales: 4200 },
    { date: "2025-11-02", sales: 3800 },
    { date: "2025-11-03", sales: 4600 },
    { date: "2025-11-04", sales: 5200 },
    { date: "2025-11-05", sales: 6100 },
    { date: "2025-11-06", sales: 5800 },
    { date: "2025-11-07", sales: 6900 },
  ],
  topProducts: [
    { name: "Manga Volume 1", qty: 420, revenue: 8400 },
    { name: "Manga Volume 2", qty: 340, revenue: 6800 },
    { name: "Artbook A", qty: 210, revenue: 6300 },
    { name: "Poster Pack", qty: 140, revenue: 2800 },
  ],
  recentOrders: [
    { id: "ORD-1001", customer: "Anita K.", amount: 45, status: "Paid", date: "2025-11-07" },
    { id: "ORD-1002", customer: "Rahul S.", amount: 120, status: "Shipped", date: "2025-11-07" },
    { id: "ORD-1003", customer: "Maya T.", amount: 18, status: "Refunded", date: "2025-11-06" },
  ],
};

// Utility: currency format
const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

export default function SalesDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sales?range=" + range);
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        // fallback to mock
        if (mounted) setData(mockResponse);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, [range]);

  const filteredOrders = useMemo(() => {
    if (!data) return [];
    if (!query) return data.recentOrders;
    return data.recentOrders.filter((o) => o.customer.toLowerCase().includes(query.toLowerCase()) || o.id.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  const exportCSV = () => {
    if (!data) return;
    const rows = [
      ["Order ID", "Customer", "Amount", "Status", "Date"],
      ...data.recentOrders.map((r) => [r.id, r.customer, r.amount, r.status, r.date]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recent-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of product sales, revenue and orders</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="border rounded-md px-3 py-2 bg-white"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              aria-label="Date range"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="ytd">Year to date</option>
            </select>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              Export CSV
            </button>
          </div>
        </header>

        {/* KPI cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-lg bg-white p-4 animate-pulse" />
            ))
          ) : (
            data && (
              <>
                <KpiCard title="Revenue" value={fmt(data.kpis.revenue)} subtitle="Total revenue" />
                <KpiCard title="Orders" value={data.kpis.orders} subtitle="Placed orders" />
                <KpiCard title="AOV" value={fmt(data.kpis.aov)} subtitle="Average order value" />
                <KpiCard title="Returning" value={`${data.kpis.returningRate}%`} subtitle="Returning customers" />
              </>
            )
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales over time */}
          <section className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Sales (time series)</h2>
            <p className="text-xs text-gray-500 mb-4">Daily sales for the selected range</p>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={(data && data.salesOverTime) || mockResponse.salesOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#1f2937" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Top products */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Top products</h2>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={(data && data.topProducts) || mockResponse.topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={140} />
                  <Tooltip />
                  <Bar dataKey="qty" barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Showing top selling products by quantity. Click a product name in the table to filter results.
            </div>
          </section>
        </div>

        {/* Recent orders + filters */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium">Recent orders</h3>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Search orders or customer"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border px-3 py-2 rounded-md"
                />
                <button className="px-3 py-2 border rounded-md">Filters</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-500">
                  <tr>
                    <th className="pb-2">Order</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="h-8 bg-gray-100 rounded-md" />
                      </tr>
                    ))
                  ) : (
                    filteredOrders.map((o) => (
                      <tr key={o.id} className="border-t">
                        <td className="py-3 font-medium">{o.id}</td>
                        <td className="py-3">{o.customer}</td>
                        <td className="py-3">{fmt(o.amount)}</td>
                        <td className="py-3">{o.status}</td>
                        <td className="py-3 text-gray-500">{o.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Insights / small widgets */}
          <aside className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium">Quick insights</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>🛈 Best day: {data ? data.salesOverTime.reduce((a, b) => (a.sales > b.sales ? a : b)).date : '—'}</li>
              <li>🛈 Top product: {data ? data.topProducts[0].name : '—'}</li>
              <li>🛈 Avg. order value: {data ? fmt(data.kpis.aov) : '—'}</li>
            </ul>

            <div className="mt-4">
              <button className="w-full px-3 py-2 bg-green-600 text-white rounded-md">Create report</button>
            </div>
          </aside>
        </div>

        <footer className="mt-8 text-xs text-gray-500">© {new Date().getFullYear()} Company — Sales Dashboard</footer>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="text-xs text-gray-400 mt-2">{subtitle}</div>
    </div>
  );
}

/*
API route example (Next.js pages router) - place in /pages/api/sales.js

export default function handler(req, res) {
  // parse req.query.range and fetch from DB accordingly
  res.status(200).json(mockResponse);
}

If you use the app router, put the handler in /app/api/sales/route.js

Security & Production notes:
- Add server-side caching for heavy queries.
- Protect the API route with authentication (JWT/session).
- Use aggregate queries in your DB to compute KPIs efficiently.
- Consider server-side rendering (SSR) for first paint performance.

Customization ideas:
- Add segmentation (channel, country, campaign).
- Add drill-down on charts (click a bar to filter table).
- Add role-based view so sales reps see only their region.
*/
