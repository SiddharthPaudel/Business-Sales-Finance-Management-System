"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Header from "../components/Header";

const data = [
  { name: "Jan", Sales: 4000, Customers: 2400 },
  { name: "Feb", Sales: 3000, Customers: 1398 },
  { name: "Mar", Sales: 2000, Customers: 9800 },
  { name: "Apr", Sales: 2780, Customers: 3908 },
  { name: "May", Sales: 1890, Customers: 4800 },
  { name: "Jun", Sales: 2390, Customers: 3800 },
  { name: "Jul", Sales: 3490, Customers: 4300 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="pt-24 px-6 md:px-12">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-500 text-sm font-medium">Total Sales</h2>
            <p className="text-2xl font-bold mt-2">$12,340</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-500 text-sm font-medium">New Customers</h2>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-500 text-sm font-medium">Revenue</h2>
            <p className="text-2xl font-bold mt-2">$8,900</p>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-gray-700 font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="Customers" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-700 font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">2025-12-01</td>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">Product A</td>
                  <td className="px-4 py-2">$120</td>
                  <td className="px-4 py-2 text-green-600 font-medium">Paid</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">2025-12-02</td>
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">Product B</td>
                  <td className="px-4 py-2">$90</td>
                  <td className="px-4 py-2 text-yellow-600 font-medium">Pending</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">2025-12-03</td>
                  <td className="px-4 py-2">Alice Johnson</td>
                  <td className="px-4 py-2">Product C</td>
                  <td className="px-4 py-2">$150</td>
                  <td className="px-4 py-2 text-red-600 font-medium">Failed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
