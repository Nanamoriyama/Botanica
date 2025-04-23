"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { PiBagSimpleThin, PiPersonThin } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, isReady } = useCart();

  if (!isReady) return null;
  return (
    <>
      {/* Navbar */}
      <div className="bg-white/10 backdrop-blur-sm fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-20">
        <button onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu size={24} />
        </button>
        <Link href="/">
          <div className="flex justify-center flex-col items-center font-thin text-lg">
            <div className="tracking-widest">B O T A N I C A</div>
            <div className="text-base">Botanic Store</div>
          </div>
        </Link>
        <div className="flex gap-4">
          <Link href="/login">
            <PiPersonThin size={28} className="text-stone-700" />
          </Link>
          <Link href="/cart">
            <PiBagSimpleThin size={28} className="text-stone-700" />
          </Link>
        </div>
      </div>

      {/* Slide Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-white text-stone-900 flex flex-col animate-slide-in">
          <div className="flex flex-col justify-between h-screen">
            <div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-left text-2xl font-light mb-8 hover:font-bold p-6"
              >
                ×
              </button>
              <nav className="flex flex-col gap-6 text-xl font-extralight">
                <Link
                  href="/"
                  className="hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="p-4">Home</p>
                </Link>
                <Link
                  href="/plants"
                  className="hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="p-4">Shop</p>
                </Link>
                <Link
                  href="/contact"
                  className="hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="p-4">Contact</p>
                </Link>
              </nav>
            </div>
            <div className="bg-gray-100">
              <div className="flex items-center m-6">
                <IoPersonOutline className="mx-2" />
                <Link href="login">
                  <p className="text-sm" onClick={() => setIsOpen(false)}>
                    Log in
                  </p>
                </Link>
              </div>

              <div className="w-52 bg-gray-100 p-2 m-6">
                <select
                  id="country"
                  className="outline-none w-full text-sm bg-gray-100"
                >
                  <option value="NL">Netherlands | EUR</option>
                  <option value="JP">Japan | JPY</option>
                  <option value="US">United States | USD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
