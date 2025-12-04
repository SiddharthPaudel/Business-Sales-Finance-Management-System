"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "./SectionTitle";

export default function MainGoal() {
  return (
    <section className="w-full py-20 px-6 bg-white">
      <SectionTitle
        title="Our Main Goal"
        subtitle="A powerful, easy-to-use platform designed for small businesses to manage all sales, customers, and finances in one place—without any technical knowledge."
      />

      <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">

        {/* Dashboard Image (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src="/images/dash.png" // <--- Use path relative to public folder
              alt="Dashboard Preview"
              width={900}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Description (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-2xl font-bold text-gray-900">
            Why We Built This Platform
          </h3>

          <p className="text-gray-600 text-lg leading-relaxed">
            Most small businesses still track their sales using notebooks or
            basic spreadsheets. This results in confusion, errors, and no clear 
            understanding of their business performance.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Our goal is to provide a modern, automated, beginner-friendly tool 
            that gives business owners clarity, accuracy, and control over their
            daily operations.
          </p>

          <ul className="text-gray-700 text-lg space-y-3 mt-4">
            <li>• Track sales, expenses, customers, and products easily</li>
            <li>• Understand business performance instantly with dashboards</li>
            <li>• Reduce financial errors through automated calculations</li>
            <li>• Make smarter decisions using real-time analytics</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
