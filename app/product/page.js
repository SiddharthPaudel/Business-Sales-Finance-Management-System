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

  // Fetch all products
  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle form input
  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) fd.append(key, form[key]);
    });

    await fetch("/api/products", {
      method: "POST",
      body: fd,
    });

    setForm({ name: "", description: "", price: "", stock: "", image: null });
    loadProducts();
  }

  return (
  <div className="min-h-screen bg-gray-100 px-4 py-10 pt-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* LEFT SIDE – ADD PRODUCT */}
      <div className="bg-white shadow-md p-6 rounded-lg border w-[300px] ml-0">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full p-2 border rounded"
            type="number"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-2 border rounded"
            type="number"
            placeholder="Stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-2 border rounded"
            type="file"
            name="image"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* RIGHT SIDE – PRODUCTS LIST */}
     {/* RIGHT SIDE – PRODUCTS LIST */}
<div className="md:col-span-2">
  <h2 className="text-xl font-bold mb-4">Products</h2>

  <div className="flex flex-wrap gap-4">
    {products.map((product) => (
      <div
        key={product._id}
        className="bg-white shadow-sm p-3 rounded-lg border hover:shadow-lg transition-all duration-200 flex flex-col"
        style={{ width: "200px" }} // Fixed width
      >
        {product.image && (
          <div className="w-full h-40 overflow-hidden rounded-md">
            <img
              src={`/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h3 className="text-md font-semibold mt-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-blue-600 text-sm">
            ${product.price}
          </span>
          <span className="text-xs text-gray-700">Stock: {product.stock}</span>
        </div>
      </div>
    ))}
  </div>

  {products.length === 0 && (
    <p className="text-gray-500 mt-4">No products found.</p>
  )}
</div>

    </div>
  </div>
);

}
