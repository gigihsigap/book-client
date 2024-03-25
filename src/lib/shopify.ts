const domain: string | undefined = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken: string | undefined = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN;
const collection: string | undefined = process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION;

interface ShopifyResponse {
  data?: {
    collectionByHandle?: {
      products?: {
        edges?: {
          node?: {
            id?: string;
            title?: string;
            description?: string;
            handle?: string;
            images?: {
              edges?: {
                node?: {
                  id?: string;
                  originalSrc?: string;
                  height?: number;
                  width?: number;
                  altText?: string;
                };
              }[];
            };
            variants?: {
              edges?: {
                node?: {
                  id?: string;
                  title?: string;
                  price?: string;
                };
              }[];
            };
          };
        }[];
      };
    };
    productByHandle?: {
      id?: string;
      title?: string;
      handle?: string;
      description?: string;
      images?: {
        edges?: {
          node?: {
            id?: string;
            originalSrc?: string;
            height?: number;
            width?: number;
            altText?: string;
          };
        }[];
      };
      variants?: {
        edges?: {
          node?: {
            id?: string;
            title?: string;
            price?: string;
          };
        }[];
      };
    };
    checkoutCreate?: {
      checkout?: {
        id?: string;
        webUrl?: string;
        lineItems?: {
          edges?: {
            node?: {
              id?: string;
              title?: string;
              quantity?: number;
            };
          }[];
        };
      };
    };
    checkoutLineItemsReplace?: {
      checkout?: {
        id?: string;
        webUrl?: string;
        lineItems?: {
          edges?: {
            node?: {
              id?: string;
              title?: string;
              quantity?: number;
            };
          }[];
        };
      };
    };
  };
}

async function callShopify(query: string): Promise<ShopifyResponse> {
  const fetchUrl: string = `https://${domain}/api/2021-01/graphql.json`;

  const fetchOptions: RequestInit = {
    // endpoint: fetchUrl,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response: Response = await fetch(fetchUrl, fetchOptions);
    const data: ShopifyResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error("Could not fetch products!");
  }
}

export async function getAllProductsInCollection(): Promise<any[]> {
  const query: string =
    `{
      collectionByHandle(handle: "${collection}") {
        id
        title
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 250) {
                edges {
                  node {
                    id
                    originalSrc
                    height
                    width     
                    altText             
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    title
                    price                
                  }
                }
              }
            }
          }
        }
      }
    }`
  ;

  const response: ShopifyResponse = await callShopify(query);

  const allProducts: any[] = response.data?.collectionByHandle?.products?.edges
    ? response.data.collectionByHandle.products.edges
    : [];

  return allProducts;
}

export async function getProductSlugs(): Promise<string[]> {
  const query: string =
    `{
      collectionByHandle(handle: "${collection}") {
        products(first: 250) {
          edges {
            node {
              handle              
            }
          }
        }
      }
    }`
  ;

  const response: ShopifyResponse = await callShopify(query);

  const slugs: string[] = response.data?.collectionByHandle?.products?.edges
    ? response.data.collectionByHandle.products.edges.map((edge: any) => edge.node?.handle)
    : [];

  return slugs;
}

export async function getProduct(handle: string): Promise<any> {
  const query: string =
    `{
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 250) {
          edges {
            node {
              id
              originalSrc
              height
              width     
              altText             
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price                
            }
          }
        }
      }
    }`
  ;

  const response: ShopifyResponse = await callShopify(query);

  const product: any = response.data?.productByHandle
    ? response.data.productByHandle
    : {};

  return product;
}

export async function createCheckout(id: string, quantity: number): Promise<any> {
  const query: string =
    `mutation 
      {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
        }) {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `
  ;

  const response: ShopifyResponse = await callShopify(query);

  const checkout: any = response.data?.checkoutCreate?.checkout
    ? response.data.checkoutCreate.checkout
    : {};

  return checkout;
}

export async function updateCheckout(id: string, lineItems: { variantId: string; quantity: number }[]): Promise<any> {
  const formattedLineItems: string[] = lineItems.map(item => {
    return `{
      variantId: "${item.variantId}",
      quantity:${item.quantity}
    }`
  });

  const query: string =
    `mutation 
      {
        checkoutLineItemsReplace(lineItems: [${formattedLineItems}], checkoutId: "${id}") {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `
  ;

  const response: ShopifyResponse = await callShopify(query);

  const checkout: any = response.data?.checkoutLineItemsReplace?.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : {};

  return checkout;
}
