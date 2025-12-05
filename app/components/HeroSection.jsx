"use client";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
     // optional but useful
});

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={`relative w-full bg-white py-32 flex flex-col items-center text-center px-6 overflow-hidden ${inter.className}`}>

      {/* Floating Circular Images */}
      {/* Left Top */}
      <motion.div
        initial={{ opacity: 2 }}
        animate={{ opacity: 2, x: [-10, 10, -10], y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-20 left-10 w-35 h-35 rounded-full overflow-hidden shadow-lg border-blue-500-5 border-4 border-blue-600"
      >
        <Image src="/images/pic1.png" alt="Floating" fill className="object-cover" />
      </motion.div>

      {/* Left Bottom */}
      <motion.div
        initial={{ opacity: 2 }}
        animate={{ opacity: 2, x: [-10, 10, -10], y: [-10, 10, -10] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute bottom-24 left-20 w-35 h-35 rounded-full overflow-hidden shadow-lg border-4 border-blue-600"
      >
        <Image src="/images/pic2.png" alt="Floating" fill className="object-cover" />
      </motion.div>

      {/* Right Top */}
      <motion.div
        initial={{ opacity: 2 }}
        animate={{ opacity: 2, x: [-10, 10, -10], y: [-10, 10, -10] }}
        transition={{ duration: 4.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-24 right-10 w-35 h-35 rounded-full overflow-hidden shadow-lg border-4 border-blue-600"
      >
        <Image src="/images/pic3.png" alt="Floating" fill className="object-cover" />
      </motion.div>

      {/* Right Bottom */}
      <motion.div
        initial={{ opacity: 2 }}
        animate={{ opacity: 2, x: [-10, 10, -10], y: [-10, 10, -10] }}
        transition={{ duration: 4.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-35 h-35 rounded-full overflow-hidden shadow-lg border-4 border-blue-600"
      >
        <Image src="/images/pic4.png" alt="Floating" fill className="object-cover" />
      </motion.div>

      {/* Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-gray-900 z-10  "
      >
        Manage Your Business Sales  
        <span className="block text-blue-600 mt-2">Smarter & Faster</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600 z-10"
      >
        A simple, powerful, and intuitive sales management system designed
        for non-technical business owners.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium shadow hover:bg-blue-700 transition z-10"
      >
        Get Started
      </motion.button>
    </section>
  );
}
