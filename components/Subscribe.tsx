"use client";

import { FaArrowRightLong } from "react-icons/fa6";

export default function Subscribe() {
  return (
    <div className="flex justify-center flex-col items-center m-8">
      <p className="m-3 font-light">Subscribe to our emails</p>

      <div className="relative w-80 md:w-96">
        <input
          type="email"
          placeholder="Email"
          className="border border-stone-900 py-3 px-2 w-80 m-2 focus:outline-none focus:border-2 focus:border-stone-900 md:w-96"
        />
        <FaArrowRightLong className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 cursor-pointer" />
      </div>
    </div>
  );
}
