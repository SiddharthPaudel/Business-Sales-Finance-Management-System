"use client";

import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
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

  // Fetch products
  async function loadProducts() {
    const res = await fetch("/api/products",{
      credentials:"include",
    });
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
    Object.keys(form).forEach((key) => {
      if (form[key]) fd.append(key, form[key]);
    });

    const res = await fetch("/api/products", { method: "POST", body: fd,credentials:"include" });
    if (res.ok) {
      setForm({ name: "", description: "", price: "", stock: "", image: null });
      setMessage("Product added successfully!");
      loadProducts();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function openEditModal(product) {
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
      credentials:"include"
    });

    if (res.ok) {
      setEditProductId(null);
      setMessage("Product updated successfully!");
      loadProducts();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" ,credentials:"include"});
    if (res.ok) {
      setMessage("Product deleted successfully!");
      loadProducts();
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <div className="min-h-screen  px-4 py-10 pt-10">
      {message && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Product Form */}
        <div className="bg-white shadow-md p-6 rounded-lg border w-[300px]">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Stock"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              className="w-full p-2 border rounded"
              name="image"
              onChange={handleChange}
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-xl p-3 shadow-sm hover:shadow-md transition bg-white w-[160px]"
              >
                <img
                  src={p.image ? `/uploads/${p.image}` : "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-sm mt-2 truncate">{p.name}</h3>
                <p className="text-xs text-gray-500 truncate">{p.description}</p>
                <p className="text-sm font-bold mt-1">Rs. {p.price}</p>
                <p className="text-xs text-gray-500">Stock: {p.stock}</p>
                <div className="flex justify-between mt-2">
                  <button
                    className="text-blue-600 text-xs hover:underline"
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 text-xs hover:underline"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editProductId && (
        <div className="fixed inset-0 flex items-start md:items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4 relative mt-10 md:mt-0">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setEditProductId(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-3">Edit Product</h2>
           <div className="flex justify-center mb-4">
  <img
    src={`/uploads/${existingImage}`}
    alt="Product"
    className="max-w-full max-h-60 object-contain rounded"
  />
</div>


            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                className="w-full p-2 border rounded text-sm"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <textarea
                className="w-full p-2 border rounded text-sm"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              <input
                type="number"
                className="w-full p-2 border rounded text-sm"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
              <input
                type="number"
                className="w-full p-2 border rounded text-sm"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
              <input
                type="file"
                className="w-full p-2 border rounded text-sm"
                name="image"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
