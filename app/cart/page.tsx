"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { GoTrash } from "react-icons/go";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    totalPrice,
    increaseQty,
    decreaseQty,
    isReady,
  } = useCart();
  if (!isReady) return null;
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
              key={item.cartItemId}
              className="flex justify-between items-center border-b py-4"
            >
              {/* 画像表示 */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div>
                  <p className="font-light">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.price}€ x {item.quantity}
                  </p>

                  {/* 数量増減ボタン */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.cartItemId!)}
                      className="px-2 py-1 border"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.cartItemId!)}
                      className="px-2 py-1 border"
                    >
                      ＋
                    </button>
                  </div>
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="hover:underline"
              >
                <GoTrash />
              </button>
            </div>
          ))}

          {/* 合計金額 & チェックアウトボタン */}
          <div className="m-6 text-right font-light text-lg ">
            Total: €{totalPrice.toFixed(2)} EUR
          </div>
          <div className="text-gray-500">
            Taxes included. Discounts and shipping calculated at checkout.
          </div>
          <div className="flex justify-center items-center">
            <Link href="/checkout-preview">
              <button className="w-48 mt-4 bg-black font-extralight text-white px-6 py-2 hover:bg-stone-800 transition">
                Check out
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
