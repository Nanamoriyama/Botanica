"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { createCheckout } from "@/lib/shopify";

export default function CheckoutPreviewPage() {
  const { cart, totalPrice } = useCart();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !address) {
      alert("Please fill in all fields!");
      return;
    }

    const firstItem = cart[0];
    if (!firstItem.variantId) {
      alert("No variant ID found!");
      return;
    }

    const checkoutUrl = await createCheckout(
      firstItem.variantId,
      firstItem.quantity || 1
    );

    window.location.href = checkoutUrl;
  };

  return (
    <div className="p-10 mt-10">
      <h1 className="text-2xl font-light mb-6">Checkout Preview</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="flex items-center mb-4 border-b pb-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="mr-4"
              />
              <div>
                <p className="font-light">{item.title}</p>
                <p className="text-sm text-gray-600">
                  €{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right text-lg font-semibold">
            Total: €{totalPrice.toFixed(2)}
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-4 max-w-md">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />

            <button
              type="submit"
              className="mt-6 bg-black text-white px-6 py-2 hover:bg-stone-800 transition"
            >
              Pay Now
            </button>
          </form>
        </>
      )}
    </div>
  );
}
