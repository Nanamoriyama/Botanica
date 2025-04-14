// app/products/[handle]/page.tsx
import { getProductByHandle } from "@/lib/shopify";
import ProductPageClient from "@/components/ProductPageClient";

export default async function ProductPage({ params }: { params: any }) {
  const product = await getProductByHandle(params.handle);

  if (!product) return <div>Product not found</div>;

  return <ProductPageClient product={product} />;
}
