import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String }, // stores filename
    userId: { type: String, required: true },
  },  
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
