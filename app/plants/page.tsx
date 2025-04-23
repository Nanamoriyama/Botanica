// app/plants/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  handle: string;
}

export default function AllPlantsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
      const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

      const query = `
        query {
          products(first: 100) {
            edges {
              node {
                id
                title
                handle
                description
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `;

      const res = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token || "",
        },
        body: JSON.stringify({ query }),
      });

      const json = await res.json();
      const data = json.data.products.edges.map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          description: node.description,
          image: node.images.edges[0]?.node.url || "",
          price: new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: node.priceRange.minVariantPrice.currencyCode,
          }).format(node.priceRange.minVariantPrice.amount),
        };
      });

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 mt-20">
      <h1 className="text-3xl font-extralight mb-6 text-center">All Plants</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="p-4 bg-white hover:shadow-md transition block"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-58 object-cover mb-2"
            />
            <h2 className="text-sm font-light mb-1">{product.title}</h2>
            <p className="font-light text-slate-700">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
