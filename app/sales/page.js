"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SalesPage() {
  const { data: session } = useSession();

  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    productId: "",
    customer: "",
    quantity: 1,
  });

  const [editSale, setEditSale] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editCustomer, setEditCustomer] = useState("");

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  async function fetchSales() {
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(data.sales || []);
  }

  async function fetchProducts() {
    const res = await fetch("/api/products", { credentials: "include" });
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : data.products || []);
  }

  // ================= ADD SALE =================
  async function addSale(e) {
    e.preventDefault();

    if (!session?.user?.id) return;

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        userId: session.user.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to add sale");
      return;
    }

    setForm({ productId: "", customer: "", quantity: 1 });
    setMessage("Sale added successfully");
    fetchSales();
    setTimeout(() => setMessage(""), 3000);
  }

  // ================= EDIT SALE =================
  async function updateSale() {
    const res = await fetch(`/api/sales/${editSale._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: editQuantity, customer: editCustomer }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setEditSale(null);
    setMessage("Sale updated successfully");
    fetchSales();
    setTimeout(() => setMessage(""), 3000);
  }

  // ================= DELETE SALE =================
  async function deleteSale(id) {
    if (!confirm("Are you sure you want to delete this sale?")) return;

    const res = await fetch(`/api/sales/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessage("Sale deleted successfully");
      fetchSales();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ADD SALE */}
        <form
          onSubmit={addSale}
          className="bg-white rounded-2xl shadow p-5 space-y-4"
        >
          <h2 className="text-xl font-semibold">Add Sale</h2>

          {message && (
            <div className="bg-green-100 text-green-800 p-2 rounded text-sm">
              {message}
            </div>
          )}

          <select
            className="w-full border rounded-lg p-2"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>

          <input
            className="w-full border rounded-lg p-2"
            placeholder="Customer name"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
            required
          />

          <input
            type="number"
            min="1"
            className="w-full border rounded-lg p-2"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value) })
            }
            required
          />

          <button className="w-full bg-black text-white py-2 rounded-xl">
            Save Sale
          </button>
        </form>

        {/* SALES TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Sales History</h2>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Customer</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3 flex items-center gap-3">
                    {s.productId?.image && (
                      <img
                        src={`/uploads/${s.productId.image}`}
                        className="w-10 h-10 object-cover rounded"
                        alt={s.productId?.name}
                      />
                    )}
                    <span>{s.productId?.name || "Deleted product"}</span>
                  </td>
                  <td className="p-3 text-center">{s.customer}</td>
                  <td className="p-3 text-center">{s.quantity}</td>
                  <td className="p-3 text-center">Rs. {s.totalAmount}</td>
                  <td className="p-3 text-center">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      className="text-blue-600 text-xs"
                      onClick={() => {
                        setEditSale(s);
                        setEditQuantity(s.quantity);
                        setEditCustomer(s.customer);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 text-xs"
                      onClick={() => deleteSale(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editSale && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-80">
            <h3 className="text-lg font-semibold mb-3">Edit Sale</h3>

            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Customer name"
              value={editCustomer}
              onChange={(e) => setEditCustomer(e.target.value)}
              required
            />

            <input
              type="number"
              min="1"
              className="w-full border p-2 rounded mb-4"
              placeholder="Quantity"
              value={editQuantity}
              onChange={(e) => setEditQuantity(Number(e.target.value))}
              required
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setEditSale(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={updateSale}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
