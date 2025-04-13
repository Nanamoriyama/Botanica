// app/products/[handle]/page.tsx
import Subscribe from "@/components/Subscribe";
import { getProductByHandle } from "@/lib/shopify";
import Image from "next/image";
import { GoShare } from "react-icons/go";

type Props = {
  params: {
    handle: string;
  };
};
export default async function ProductPage({ params }: { params: any }) {
  const product = await getProductByHandle(params.handle);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="px-10 mt-4 md:flex">
        {product.images[0]?.url && (
          <div className="flex justify-center p-10">
            <Image
              src={product.images[0].url}
              alt={product.title}
              width={400}
              height={300}
              className=""
            />
          </div>
        )}
        <div className="md:w-1/2 m-4 px-4">
          <h1 className="text-3xl font-light my-2 py-4">{product.title}</h1>
          <p className="font-light my-2 ">{product.price} EUR</p>
          <p className="text-stone-500 text-xs">Taxes included.</p>
          <div className="flex justify-center flex-col max-w-md">
            <button className="mt-6 mb-4 px-12 py-2 border border-stone-950 hover:border-stone-900 hover:ring-2 hover:ring-stone-950 transition">
              Add to Cart
            </button>

            <p className="mt-6 text-gray-700">{product.description}</p>
            <div className="flex mt-8 items-center">
              <GoShare />
              <p className="ml-2">Share</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
