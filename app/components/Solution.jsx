"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import SectionTitle from "./SectionTitle";

const items = [
  {
    title: "Organized Sales",
    desc: "Record every sale instantly.",
    img: "/images/solution.png",
  },
  {
    title: "Auto Profit",
    desc: "Profit updates live automatically.",
    img: "/images/pic2.png",
  },
  {
    title: "Customer History",
    desc: "View purchase history anytime.",
    img: "/images/pic4.png",
  },
  {
    title: "Live Inventory",
    desc: "Stock updates automatically.",
    img: "/images/pic3.png",
  },
];

export default function Solutions() {
  return (
    <section className="w-full py-12 px-4 bg-white">
      <SectionTitle
        title="How This System Helps"
        subtitle="Automate your business workflow easily."
      />

      <div className="max-w-3xl mx-auto mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="pb-8"
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-6 rounded-xl text-center border border-gray-100">
                <div className="w-40 h-40 mx-auto mb-4 relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-500 text-sm">{item.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
