"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { GoShare } from "react-icons/go";
import CartModal from "./CartModal";

type Props = {
  product: {
    id: string;
    variantId: string;
    title: string;
    description: string;
    price: number;
    currencyCode: string;
    images: { url: string }[];
  };
};

export default function ProductPageClient({ product }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const formattedPrice = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: product.currencyCode || "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="px-10 mt-4 md:flex py-6">
      {product.images[0]?.url && (
        <div className="flex justify-center p-10">
          <Image
            src={product.images[0].url}
            alt={product.title}
            width={400}
            height={300}
          />
        </div>
      )}
      <div className="md:w-1/2 m-4 px-4">
        <h1 className="text-3xl font-light my-2 py-4">{product.title}</h1>
        <p className="font-light my-2">{formattedPrice} EUR</p>
        <p className="text-stone-500 text-xs">Taxes included.</p>

        <div className="flex justify-center flex-col max-w-md">
          {/* 数量選択 */}
          <div className="flex flex-col ">
            <p className="mt-5 text-xs font-extralight mb-1">Quantity</p>
            <div className="flex items-center justify-between p-1 w-44 shadow-md gap-4 mb-4 border border-stone-800">
              <button onClick={decrease} className="px-3 py-1 font-light">
                −
              </button>
              <span className="text-lg font-light">{quantity}</span>
              <button onClick={increase} className="px-3 py-1 font-light ">
                ＋
              </button>
            </div>
          </div>

          <button
            className="mt-6 mb-4 px-12 py-2 border text-stone-800 font-light border-stone-800 hover:border-stone-900 hover:ring-2 hover:ring-stone-800 transition"
            onClick={() => {
              addToCart({
                id: product.id,
                variantId: product.variantId,
                title: product.title,
                price: product.price,
                image: product.images[0]?.url || "",
                quantity,
              });
              setShowModal(true);
            }}
          >
            Add to Cart
          </button>
          {showModal && <CartModal onClose={() => setShowModal(false)} />}
          <p className="mt-6 text-gray-700">{product.description}</p>
          <div className="flex mt-8 items-center">
            <GoShare />
            <p className="ml-2">Share</p>
          </div>
        </div>
      </div>
    </div>
  );
}
