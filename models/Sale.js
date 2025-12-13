import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true }, // owner of the sale
    customer:{type: String, required:true , trim :true},
    quantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
