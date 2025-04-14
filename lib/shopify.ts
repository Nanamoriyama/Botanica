const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

export async function fetchProducts() {
  const response = await fetch(`https://${domain}/api/2023-07/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                description
                images(first: 1) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json = await response.json();
  return json.data.products.edges.map((edge: any) => edge.node);
}

export async function getProductByHandle(handle: string) {
  const res = await fetch(`https://${domain}/api/2023-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({
      query: `
        query ProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange{
              minVariantPrice{
                amount
                currencyCode
              }
            }
          }
        }
      `,
      variables: {
        handle,
      },
    }),
  });

  const json = await res.json();
  const product = json.data.productByHandle;
  return product
    ? {
        id: product.id,
        title: product.title,
        description: product.description,
        images: product.images.edges.map((e: any) => e.node),
        price: parseFloat(product.priceRange.minVariantPrice.amount), // ← number 型で保持
        currencyCode: product.priceRange.minVariantPrice.currencyCode,
      }
    : null;
}
