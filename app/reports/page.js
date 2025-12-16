"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function downloadCSV() {
    setLoading(true);
    setError("");

    try {
      let url = "/api/reports/csv";

      if (from || to) {
        const params = new URLSearchParams();
        if (from) params.append("from", from);
        if (to) params.append("to", to);
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "sales-report.csv";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError("Something went wrong while downloading report");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">Reports</h1>
        <p className="text-gray-500 mb-6">
          Download your sales report as CSV
        </p>

        {/* Date Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={downloadCSV}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Generating Report..." : "Download CSV Report"}
        </button>

        {/* Info */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          File will be saved to your device (Downloads folder)
        </p>
      </div>
    </div>
  );
}
