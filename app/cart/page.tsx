// app/cart/page.tsx
"use client";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className="p-10 mt-10">
      {cart.length === 0 ? (
        <p className="text-gray-500 flex justify-center items-center mt-10">
          Your cart is empty
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p>{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.price}€ x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right font-semibold text-lg">
            Total: €{totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
