// components/CartModal.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";
import { VscCheck } from "react-icons/vsc";

type Props = {
  onClose: () => void;
};

export default function CartModal({ onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3秒後に自動で閉じる

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed flex-col justify-center items-center top-4 right-4 bg-white border border-stone-300 shadow-md p-4 z-50 animate-slide-in">
      <p className="text-sm mb-2 flex justify-center items-center p-3">
        <VscCheck className="mr-3" />{" "}
        <p className="text-ligt">Item added to your cart</p>
      </p>
      <Link
        href="/cart"
        className="border border-stone-700  tracking-wide flex justify-center items-center p-3 text-sm"
      >
        View cart
      </Link>
    </div>
  );
}
