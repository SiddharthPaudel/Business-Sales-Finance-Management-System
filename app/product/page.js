"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Search, X } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [editProductId, setEditProductId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  async function loadProducts() {
    const res = await fetch("/api/products", { credentials: "include" });
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  }

  async function handleAdd(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => form[k] && fd.append(k, form[k]));

    const res = await fetch("/api/products", {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    if (res.ok) {
      setForm({ name: "", description: "", price: "", stock: "", image: null });
      setMessage("Product added successfully");
      loadProducts();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  function openEditModal(product) {
    setEditProductId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null,
    });
    setExistingImage(product.image || "");
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("stock", form.stock);
    if (form.image) fd.append("image", form.image);

    const res = await fetch(`/api/products/${editProductId}`, {
      method: "PUT",
      body: fd,
      credentials: "include",
    });

    if (res.ok) {
      setEditProductId(null);
      setMessage("Product updated successfully");
      loadProducts();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function confirmDelete() {
    const res = await fetch(`/api/products/${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setDeleteId(null);
      setMessage("Product deleted successfully");
      loadProducts();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-10">
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow text-sm">
          {message}
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Product */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-lg font-semibold mb-4">Add Product</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <input className="input" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
            <textarea className="input" placeholder="Description" name="description" value={form.description} onChange={handleChange} />
            <input className="input" type="number" placeholder="Price" name="price" value={form.price} onChange={handleChange} />
            <input className="input" type="number" placeholder="Stock" name="stock" value={form.stock} onChange={handleChange} />
            <input type="file" name="image" onChange={handleChange} />
            <button className="w-full bg-black text-white py-2 rounded-lg">
              Add Product
            </button>
          </form>
        </div>

        {/* Products */}
        <div className="md:col-span-2">
          <div className="relative max-w-xs mb-5">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-9 p-2 border rounded-lg text-sm"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((p) => (
              <div key={p._id} className="bg-white rounded-xl border p-3">
                <img
                  src={p.image ? `/uploads/${p.image}` : "/placeholder.png"}
                  className="h-28 w-full object-cover rounded-lg"
                />

                <div className="mt-2">
                  <h3 className="text-sm font-medium truncate">{p.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{p.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semibold">Rs. {p.price}</span>
                    <span className="text-xs text-gray-400">Stock: {p.stock}</span>
                  </div>
                </div>

                {/* ✅ ALWAYS VISIBLE ICONS */}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => openEditModal(p)}
                    className="p-1 text-gray-600 hover:text-black"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(p._id)}
                    className="p-1 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editProductId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
              onClick={() => setEditProductId(null)}
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-3">Edit Product</h2>

            {existingImage && (
              <img
                src={`/uploads/${existingImage}`}
                className="h-40 w-full object-contain mb-3"
              />
            )}

            <form onSubmit={handleUpdate} className="space-y-3">
              <input className="input" name="name" value={form.name} onChange={handleChange} />
              <textarea className="input" name="description" value={form.description} onChange={handleChange} />
              <input className="input" type="number" name="price" value={form.price} onChange={handleChange} />
              <input className="input" type="number" name="stock" value={form.stock} onChange={handleChange} />
              <input type="file" name="image" onChange={handleChange} />
              <button className="w-full bg-black text-white py-2 rounded-lg">
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
