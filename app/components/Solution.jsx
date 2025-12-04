"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const items = [
  {
    title: "Organized Sales Management",
    desc: "Record every sale with customer, price, and product details.",
  },
  {
    title: "Automatic Profit Calculation",
    desc: "No more manual calculations — profit updates instantly.",
  },
  {
    title: "Customer History Tracking",
    desc: "View every customer's purchase history and lifetime value.",
  },
  {
    title: "Live Inventory Updates",
    desc: "Stock reduces automatically after every sale.",
  },
];

export default function Solutions() {
  return (
    <section className="w-full py-20 px-6 bg-[#fafafa]">
      <SectionTitle
        title="How This System Solves Business Problems"
        subtitle="Traditional notebooks and Excel sheets create mistakes. Our system fixes them with automation."
      />

      <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto mt-12">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-3 text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
