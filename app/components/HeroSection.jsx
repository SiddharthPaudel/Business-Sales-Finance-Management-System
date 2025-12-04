"use client";

import { motion , useAnimation } from "framer-motion";
import { useEffect } from "react";
export default function Hero() {

    const bgControls=useAnimation();

    useEffect(()=>{
        // initial entrance
        bgControls.start({
            scale:1,
            x:0,
            opacity:1,
            transition:{duration:0.8}
        }).then(()=>{
            //Continuos slow motion after entracne
            bgControls.start({
                scale:[1,1.05,1],
                x:[0,20,0],
                transition:{duration:15,repeat:Infinity}
            });
        })
    },[bgControls]);
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Image */}
      <motion.div
  className="absolute inset-0 bg-cover bg-center z-0"
  style={{ backgroundImage: "url('/images/bot.jpg')" }}
  initial={{ scale: 1.05, x: 0, opacity: 0 }} // start hidden + scaled
  animate={bgControls}  // match text entrance
             // same duration as text
/>

      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/5"></div> {/* Milky white overlay */}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        {/* Headline */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight"
        >
          Learn <span className="text-blue-600">Smarter</span> &{" "}
          <span className="text-purple-600">Faster</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-gray-600 text-lg md:text-xl"
        >
          Adaptive AI-powered learning platform that tracks your progress, recommends topics, and makes studying fun.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Explore Modules
          </button>
        </motion.div>

        {/* Floating Stats Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { value: "1200+", label: "Topics Covered", color: "blue-600" },
            { value: "95%", label: "Avg Accuracy", color: "purple-600" },
            { value: "7 Days", label: "Learning Streak", color: "green-600" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 rounded-2xl shadow-lg p-6 text-center"
            >
              <h2 className={`text-2xl font-bold text-${item.color}`}>{item.value}</h2>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
